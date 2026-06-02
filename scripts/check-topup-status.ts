// Usage: npx tsx scripts/check-topup-status.ts <reference_id>
//
// Looks up a top-up by merchant reference, prints the DB record, and (if the
// state is non-terminal) pulls the latest status from Armenotech via
// getTopupStatus — which now also persists external_message / fiscal_status
// / raw_callback. Useful for post-mortem on cancelled or stuck payments.

import 'dotenv/config'
import { prisma } from '../lib/prisma'
import { getTopupStatus } from '../lib/topup-payment-flow'

async function main() {
  const reference = process.argv[2]
  if (!reference) {
    console.error('Usage: npx tsx scripts/check-topup-status.ts <reference_id>')
    process.exitCode = 1
    return
  }

  const before = await prisma.transferMitTopup.findUnique({
    where: { reference_id: reference },
  })

  console.log('=== DB record (before sync) ===')
  console.log(JSON.stringify(before, null, 2))

  if (!before) {
    return
  }

  const status = await getTopupStatus(reference)
  console.log('\n=== getTopupStatus result ===')
  console.log(JSON.stringify(status, null, 2))

  const after = await prisma.transferMitTopup.findUnique({
    where: { reference_id: reference },
  })
  console.log('\n=== DB record (after sync) ===')
  console.log(JSON.stringify(after, null, 2))
}

main()
  .catch((err) => {
    console.error(err)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
