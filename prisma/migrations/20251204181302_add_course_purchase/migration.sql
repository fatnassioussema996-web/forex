-- CreateTable
CREATE TABLE "CoursePurchase" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "tokens_cost" INTEGER NOT NULL,
    "amount_gbp" DECIMAL(10,2) NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'en',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CoursePurchase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CoursePurchase_user_id_idx" ON "CoursePurchase"("user_id");

-- CreateIndex
CREATE INDEX "CoursePurchase_course_id_idx" ON "CoursePurchase"("course_id");

-- CreateIndex
CREATE INDEX "CoursePurchase_created_at_idx" ON "CoursePurchase"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "CoursePurchase_user_id_course_id_key" ON "CoursePurchase"("user_id", "course_id");

-- AddForeignKey
ALTER TABLE "CoursePurchase" ADD CONSTRAINT "CoursePurchase_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoursePurchase" ADD CONSTRAINT "CoursePurchase_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

