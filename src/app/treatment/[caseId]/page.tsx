import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseByIdFromDb } from "@/infrastructure/db/sqlite";
import { ResuscitationBayClient } from "./ResuscitationBayClient";
import { ArrowLeft } from "lucide-react";

interface CasePageProps {
  params: {
    caseId: string;
  };
}

export default function CaseTreatmentPage({ params }: CasePageProps) {
  const caseData = getCaseByIdFromDb(params.caseId);

  if (!caseData) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <ResuscitationBayClient initialCase={caseData} />
    </div>
  );
}
