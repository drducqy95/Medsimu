import {
  ClinicalCase,
  Vitals,
  ClinicalOrderAction,
  AnamnesisQuestion,
  PhysicalExamFinding,
} from "@/domain/treatment/types";

export interface TimelineLogEntry {
  id: string;
  timestampSeconds: number;
  category: "order" | "anamnesis" | "exam" | "paraclinical" | "deterioration" | "alarm" | "disposition";
  message: string;
  badgeType: "info" | "success" | "warning" | "danger";
}

export interface DebriefingScoreResult {
  totalScore: number; // Max 100
  diagnosticPoints: number; // Max 40
  safetyPoints: number; // Max 30
  treatmentPoints: number; // Max 20
  speedPoints: number; // Max 10
  passed: boolean; // >= 70%
  feedbackNotes: string[];
}

export interface SimulationState {
  caseData: ClinicalCase;
  currentVitals: Vitals;
  elapsedSeconds: number;
  isPaused: boolean;
  isCodeBlue: boolean;
  codeBlueReason: string | null;
  isFinished: boolean;
  appliedOrderIds: string[];
  answeredQuestionIds: string[];
  performedExamSystems: string[];
  timelineLogs: TimelineLogEntry[];
  selectedDiagnosis: string | null;
  selectedDisposition: string | null;
  finalScore: DebriefingScoreResult | null;
}

export function createInitialSimulationState(caseData: ClinicalCase): SimulationState {
  return {
    caseData,
    currentVitals: { ...caseData.initialVitals },
    elapsedSeconds: 0,
    isPaused: false,
    isCodeBlue: false,
    codeBlueReason: null,
    isFinished: false,
    appliedOrderIds: [],
    answeredQuestionIds: [],
    performedExamSystems: [],
    timelineLogs: [
      {
        id: "log-init",
        timestampSeconds: 0,
        category: "alarm",
        message: `Bệnh nhân ${caseData.patientProfile.name} (${caseData.patientProfile.age}T) tiếp nhận vào phòng Cấp cứu hồi sức. Phân loại: ${caseData.patientProfile.triageAcuity}.`,
        badgeType: "info",
      },
    ],
    selectedDiagnosis: null,
    selectedDisposition: null,
    finalScore: null,
  };
}

export function tickSimulationSecond(state: SimulationState): SimulationState {
  if (state.isPaused || state.isFinished) return state;

  const nextSeconds = state.elapsedSeconds + 1;
  let nextVitals = { ...state.currentVitals };
  const nextLogs = [...state.timelineLogs];
  let nextCodeBlue = state.isCodeBlue;
  let nextCodeBlueReason = state.codeBlueReason;

  // Natural deterioration every N seconds if condition not stabilized
  const det = state.caseData.naturalDeterioration;
  if (
    nextSeconds > 0 &&
    nextSeconds % det.intervalSeconds === 0 &&
    state.appliedOrderIds.length === 0 &&
    !state.isCodeBlue
  ) {
    if (det.vitalsDelta.hr) nextVitals.hr = Math.max(30, Math.min(190, nextVitals.hr + det.vitalsDelta.hr));
    if (det.vitalsDelta.bpSys) nextVitals.bpSys = Math.max(40, Math.min(240, nextVitals.bpSys + det.vitalsDelta.bpSys));
    if (det.vitalsDelta.bpDia) nextVitals.bpDia = Math.max(20, Math.min(140, nextVitals.bpDia + det.vitalsDelta.bpDia));
    if (det.vitalsDelta.spO2) nextVitals.spO2 = Math.max(50, Math.min(100, nextVitals.spO2 + det.vitalsDelta.spO2));
    if (det.vitalsDelta.glasgow) nextVitals.glasgow = Math.max(3, Math.min(15, nextVitals.glasgow + det.vitalsDelta.glasgow));

    nextLogs.unshift({
      id: `det-${nextSeconds}`,
      timestampSeconds: nextSeconds,
      category: "deterioration",
      message: det.warningMessage || "Diễn tiến bệnh tự nhiên: Dấu hiệu sinh tồn bệnh nhân đang suy giảm!",
      badgeType: "warning",
    });

    // Check critical failure thresholds
    if (nextVitals.spO2 < 70 || nextVitals.bpSys < 50 || nextVitals.glasgow <= 3) {
      nextCodeBlue = true;
      nextCodeBlueReason = "Bệnh nhân ngừng thở, trụy mạch và ngừng tim do không được cấp cứu kịp thời!";
      nextVitals.rhythmId = "asystole";
      nextVitals.hr = 0;
      nextVitals.bpSys = 0;
      nextVitals.bpDia = 0;

      nextLogs.unshift({
        id: `code-blue-${nextSeconds}`,
        timestampSeconds: nextSeconds,
        category: "alarm",
        message: `🚨 BÁO ĐỘNG ĐỎ CODE BLUE: ${nextCodeBlueReason}`,
        badgeType: "danger",
      });
    }
  }

  return {
    ...state,
    elapsedSeconds: nextSeconds,
    currentVitals: nextVitals,
    isCodeBlue: nextCodeBlue,
    codeBlueReason: nextCodeBlueReason,
    timelineLogs: nextLogs,
  };
}

export function executeOrderAction(
  state: SimulationState,
  orderId: string
): SimulationState {
  if (state.isFinished || state.appliedOrderIds.includes(orderId)) {
    return state;
  }

  const order = state.caseData.availableOrders.find((o) => o.id === orderId);
  if (!order) return state;

  const nextApplied = [...state.appliedOrderIds, orderId];
  let nextVitals = { ...state.currentVitals };
  const nextLogs = [...state.timelineLogs];
  let nextCodeBlue = state.isCodeBlue;
  let nextCodeBlueReason = state.codeBlueReason;

  // Handle fatal contraindication & Code Blue
  if (order.isContraindicated) {
    if (order.triggersCodeBlue) {
      nextCodeBlue = true;
      nextCodeBlueReason = order.dangerWarning || "Vi phạm chống chỉ định tử vong!";
      if (order.rhythmChange) {
        nextVitals.rhythmId = order.rhythmChange;
      }
      nextVitals.bpSys = Math.min(nextVitals.bpSys, 45);
      nextVitals.bpDia = Math.min(nextVitals.bpDia, 25);

      nextLogs.unshift({
        id: `fatal-order-${Date.now()}`,
        timestampSeconds: state.elapsedSeconds,
        category: "alarm",
        message: `🚨 THẢM HỌA LÂM SÀNG! Y lệnh [${order.label}]: ${order.feedbackMessage} -> ${order.dangerWarning}`,
        badgeType: "danger",
      });
    } else {
      nextLogs.unshift({
        id: `bad-order-${Date.now()}`,
        timestampSeconds: state.elapsedSeconds,
        category: "order",
        message: `⚠️ Y lệnh không thích hợp [${order.label}]: ${order.dangerWarning || order.feedbackMessage}`,
        badgeType: "warning",
      });
    }
  } else {
    // Apply physiological changes
    if (order.vitalsDelta.hr) nextVitals.hr = Math.max(30, Math.min(190, nextVitals.hr + order.vitalsDelta.hr));
    if (order.vitalsDelta.bpSys) nextVitals.bpSys = Math.max(40, Math.min(220, nextVitals.bpSys + order.vitalsDelta.bpSys));
    if (order.vitalsDelta.bpDia) nextVitals.bpDia = Math.max(20, Math.min(130, nextVitals.bpDia + order.vitalsDelta.bpDia));
    if (order.vitalsDelta.spO2) nextVitals.spO2 = Math.max(50, Math.min(100, nextVitals.spO2 + order.vitalsDelta.spO2));
    if (order.vitalsDelta.rr) nextVitals.rr = Math.max(8, Math.min(50, nextVitals.rr + order.vitalsDelta.rr));
    if (order.vitalsDelta.temp) nextVitals.temp = Number((nextVitals.temp + order.vitalsDelta.temp).toFixed(1));
    if (order.vitalsDelta.glasgow) nextVitals.glasgow = Math.max(3, Math.min(15, nextVitals.glasgow + order.vitalsDelta.glasgow));
    if (order.rhythmChange) nextVitals.rhythmId = order.rhythmChange;

    nextLogs.unshift({
      id: `good-order-${Date.now()}`,
      timestampSeconds: state.elapsedSeconds,
      category: "order",
      message: `✅ Ra y lệnh [${order.label}]: ${order.feedbackMessage}`,
      badgeType: "success",
    });
  }

  return {
    ...state,
    appliedOrderIds: nextApplied,
    currentVitals: nextVitals,
    isCodeBlue: nextCodeBlue,
    codeBlueReason: nextCodeBlueReason,
    timelineLogs: nextLogs,
  };
}

export function recordAnamnesisQuestion(
  state: SimulationState,
  questionId: string
): SimulationState {
  if (state.answeredQuestionIds.includes(questionId)) return state;

  const q = state.caseData.anamnesisQuestions.find((item) => item.id === questionId);
  if (!q) return state;

  const nextAnswered = [...state.answeredQuestionIds, questionId];
  const nextLogs = [
    {
      id: `q-${Date.now()}`,
      timestampSeconds: state.elapsedSeconds,
      category: "anamnesis" as const,
      message: `Hỏi bệnh: "${q.questionText}" -> Bệnh nhân: "${q.answerText}" (Gợi ý: ${q.clinicalClue})`,
      badgeType: "info" as const,
    },
    ...state.timelineLogs,
  ];

  return {
    ...state,
    answeredQuestionIds: nextAnswered,
    timelineLogs: nextLogs,
  };
}

export function recordPhysicalExam(
  state: SimulationState,
  system: string
): SimulationState {
  if (state.performedExamSystems.includes(system)) return state;

  const exam = state.caseData.physicalExam.find((item) => item.system === system);
  if (!exam) return state;

  const nextExams = [...state.performedExamSystems, system];
  const nextLogs = [
    {
      id: `exam-${Date.now()}`,
      timestampSeconds: state.elapsedSeconds,
      category: "exam" as const,
      message: `Khám ${exam.action}: ${exam.finding}`,
      badgeType: (exam.isAbnormal ? "warning" : "info") as any,
    },
    ...state.timelineLogs,
  ];

  return {
    ...state,
    performedExamSystems: nextExams,
    timelineLogs: nextLogs,
  };
}

export function evaluateFinalDisposition(
  state: SimulationState,
  chosenDiagnosis: string,
  chosenDisposition: string
): SimulationState {
  const rubric = state.caseData.debriefingRubric;
  const feedbackNotes: string[] = [];

  // 1. Diagnostic points (40)
  let diagScore = 0;
  if (chosenDiagnosis === state.caseData.goldStandardDiagnosis) {
    diagScore = 40;
    feedbackNotes.push("Chẩn đoán xác định chính xác tuyệt đối (+40 điểm).");
  } else {
    diagScore = 15;
    feedbackNotes.push(`Chẩn đoán chưa sát: Bạn chọn '${chosenDiagnosis}', chẩn đoán vàng là '${state.caseData.goldStandardDiagnosis}'.`);
  }

  // 2. Safety points (30)
  let safetyScore = 30;
  const appliedOrders = state.caseData.availableOrders.filter((o) =>
    state.appliedOrderIds.includes(o.id)
  );

  const contraindicatedCount = appliedOrders.filter((o) => o.isContraindicated).length;
  if (contraindicatedCount > 0) {
    safetyScore = Math.max(0, safetyScore - contraindicatedCount * 15);
    feedbackNotes.push(`Cảnh báo an toàn: Bạn đã phạm ${contraindicatedCount} chống chỉ định nguy hiểm!`);
  }
  if (state.isCodeBlue) {
    safetyScore = 0;
    feedbackNotes.push("Kích phát sự cố Code Blue hoặc tử vong lâm sàng (0 điểm an toàn).");
  }

  // 3. Treatment points (20)
  const effectiveAvailable = state.caseData.availableOrders.filter((o) => o.isEffective);
  const effectiveGiven = appliedOrders.filter((o) => o.isEffective);
  const treatmentRatio = effectiveAvailable.length > 0 ? effectiveGiven.length / effectiveAvailable.length : 1;
  const treatScore = Math.round(treatmentRatio * 20);
  feedbackNotes.push(`Điểm can thiệp: Đã ra ${effectiveGiven.length}/${effectiveAvailable.length} y lệnh đúng (+${treatScore} điểm).`);

  // 4. Speed points (10)
  let speedScore = 10;
  if (state.elapsedSeconds > 300) {
    speedScore = 4;
    feedbackNotes.push("Thời gian xử trí khá dài (> 5 phút). Cần tăng tốc độ trong cấp cứu khẩn cấp.");
  } else if (state.elapsedSeconds > 180) {
    speedScore = 7;
    feedbackNotes.push("Thời gian xử trí đạt chuẩn (3 - 5 phút).");
  } else {
    feedbackNotes.push("Xử trí rất nhanh trong thời gian vàng (+10 điểm).");
  }

  // Check disposition match
  if (chosenDisposition === state.caseData.correctDisposition) {
    feedbackNotes.push(`Xử trí chuyển tuyến đúng: ${chosenDisposition.toUpperCase()}.`);
  } else {
    feedbackNotes.push(`Quyết định chuyển khoa chưa tối ưu (Nên chuyển: ${state.caseData.correctDisposition}).`);
    diagScore = Math.max(0, diagScore - 5);
  }

  const total = diagScore + safetyScore + treatScore + speedScore;

  const result: DebriefingScoreResult = {
    totalScore: total,
    diagnosticPoints: diagScore,
    safetyPoints: safetyScore,
    treatmentPoints: treatScore,
    speedPoints: speedScore,
    passed: total >= 70 && !state.isCodeBlue,
    feedbackNotes,
  };

  return {
    ...state,
    isFinished: true,
    isPaused: true,
    selectedDiagnosis: chosenDiagnosis,
    selectedDisposition: chosenDisposition,
    finalScore: result,
  };
}
