-- Add Armenotech reason / fiscal status / raw callback to TransferMitTopup
ALTER TABLE "TransferMitTopup"
  ADD COLUMN IF NOT EXISTS "external_message" TEXT,
  ADD COLUMN IF NOT EXISTS "fiscal_status" TEXT,
  ADD COLUMN IF NOT EXISTS "raw_callback" JSONB;
