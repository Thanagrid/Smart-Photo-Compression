// Simple in-memory store for passing a file from Home → Compress page
// Works because Next.js SPA navigation doesn't do a full page reload

let _pendingFile: File | null = null;

export function setPendingFile(file: File): void {
  _pendingFile = file;
}

export function consumePendingFile(): File | null {
  const file = _pendingFile;
  _pendingFile = null;
  return file;
}
