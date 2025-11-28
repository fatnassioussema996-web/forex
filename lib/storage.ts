import fs from 'fs/promises'
import path from 'path'

interface SaveResult {
  publicPath: string
}

interface SaveOptions {
  buffer: Buffer
  filename: string
  subdirectory: string
}

/**
 * Saves file to local filesystem (public directory)
 * Files are stored in public/ directory and accessible via HTTP
 */
async function saveLocally({ buffer, filename, subdirectory }: SaveOptions): Promise<SaveResult> {
  const directory = path.join(process.cwd(), 'public', ...subdirectory.split('/'))
  await fs.mkdir(directory, { recursive: true })
  const filePath = path.join(directory, filename)
  await fs.writeFile(filePath, buffer)

  return {
    publicPath: `/${subdirectory}/${filename}`,
  }
}

/**
 * Saves generated image to public/images/generated/
 * @returns Public path to the saved image
 */
export async function saveGeneratedImage(buffer: Buffer, filename: string): Promise<SaveResult> {
  return saveLocally({ buffer, filename, subdirectory: 'images/generated' })
}

/**
 * Saves generated PDF to public/recipes/generated/
 * @returns Public path to the saved PDF
 */
export async function saveGeneratedPdf(buffer: Buffer, filename: string): Promise<SaveResult> {
  return saveLocally({ buffer, filename, subdirectory: 'recipes/generated' })
}



