-- CreateTable
CREATE TABLE "CustomCourseRequest" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "experience_years" TEXT NOT NULL,
    "deposit_budget" TEXT NOT NULL,
    "risk_tolerance" TEXT NOT NULL,
    "markets" TEXT[],
    "trading_style" TEXT NOT NULL,
    "goals_free_text" TEXT NOT NULL,
    "additional_notes" TEXT,
    "language" TEXT NOT NULL DEFAULT 'en',
    "estimated_ready_at" TIMESTAMP(3),
    "tokens_cost" INTEGER NOT NULL DEFAULT 50000,
    "payment_id" TEXT,
    "ai_model" TEXT NOT NULL DEFAULT 'gpt-4o',
    "ai_prompt" TEXT,
    "ai_response_structured" JSONB,
    "pdf_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomCourseRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiStrategyRun" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "experience_years" TEXT NOT NULL,
    "deposit_budget" TEXT NOT NULL,
    "risk_tolerance" TEXT NOT NULL,
    "markets" TEXT[],
    "trading_style" TEXT NOT NULL,
    "time_commitment" TEXT,
    "main_objective" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'en',
    "tokens_cost" INTEGER NOT NULL DEFAULT 2000,
    "ai_model" TEXT NOT NULL DEFAULT 'gpt-4o',
    "ai_prompt" TEXT,
    "ai_response_structured" JSONB,
    "rendered_text" TEXT,
    "prompt_tokens" INTEGER,
    "completion_tokens" INTEGER,
    "total_tokens" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AiStrategyRun_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CustomCourseRequest_user_id_idx" ON "CustomCourseRequest"("user_id");

-- CreateIndex
CREATE INDEX "CustomCourseRequest_status_idx" ON "CustomCourseRequest"("status");

-- CreateIndex
CREATE INDEX "CustomCourseRequest_created_at_idx" ON "CustomCourseRequest"("created_at");

-- CreateIndex
CREATE INDEX "AiStrategyRun_user_id_idx" ON "AiStrategyRun"("user_id");

-- CreateIndex
CREATE INDEX "AiStrategyRun_status_idx" ON "AiStrategyRun"("status");

-- CreateIndex
CREATE INDEX "AiStrategyRun_created_at_idx" ON "AiStrategyRun"("created_at");

-- AddForeignKey
ALTER TABLE "CustomCourseRequest" ADD CONSTRAINT "CustomCourseRequest_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiStrategyRun" ADD CONSTRAINT "AiStrategyRun_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
