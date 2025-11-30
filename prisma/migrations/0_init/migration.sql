-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT,
    "company" TEXT,
    "balance" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "citizenship" TEXT,
    "date_of_birth" DATE,
    "phone" TEXT,
    "bill_address" TEXT,
    "bill_address_2" TEXT,
    "bill_city" TEXT,
    "bill_state" TEXT,
    "bill_postal" TEXT,
    "bill_country" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "recipe_title" TEXT NOT NULL,
    "recipe_prompt" TEXT NOT NULL,
    "pdf_file_path" TEXT NOT NULL,
    "image_file_path" TEXT,
    "cost" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topup" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Topup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransferMitTopup" (
    "id" SERIAL NOT NULL,
    "topup_id" INTEGER,
    "user_id" INTEGER NOT NULL,
    "reference_id" TEXT NOT NULL,
    "payment_id" TEXT,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL,
    "tokens" INTEGER NOT NULL,
    "bonus_percent" INTEGER NOT NULL DEFAULT 0,
    "state" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransferMitTopup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "title_ar" TEXT,
    "description" TEXT NOT NULL,
    "description_ar" TEXT,
    "level" TEXT NOT NULL,
    "market" TEXT NOT NULL,
    "price_gbp" DECIMAL(10,2) NOT NULL,
    "tokens" INTEGER NOT NULL,
    "pdf_path" TEXT NOT NULL,
    "cover_image" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "modules" JSONB,
    "duration_hours_min" INTEGER,
    "duration_hours_max" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE INDEX "Recipe_user_id_idx" ON "Recipe"("user_id");

-- CreateIndex
CREATE INDEX "Recipe_created_at_idx" ON "Recipe"("created_at");

-- CreateIndex
CREATE INDEX "Topup_user_id_idx" ON "Topup"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "TransferMitTopup_reference_id_key" ON "TransferMitTopup"("reference_id");

-- CreateIndex
CREATE INDEX "TransferMitTopup_user_id_idx" ON "TransferMitTopup"("user_id");

-- CreateIndex
CREATE INDEX "TransferMitTopup_reference_id_idx" ON "TransferMitTopup"("reference_id");

-- CreateIndex
CREATE INDEX "TransferMitTopup_state_idx" ON "TransferMitTopup"("state");

-- CreateIndex
CREATE UNIQUE INDEX "Course_slug_key" ON "Course"("slug");

-- CreateIndex
CREATE INDEX "Course_level_idx" ON "Course"("level");

-- CreateIndex
CREATE INDEX "Course_market_idx" ON "Course"("market");

-- CreateIndex
CREATE INDEX "Course_featured_idx" ON "Course"("featured");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topup" ADD CONSTRAINT "Topup_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

