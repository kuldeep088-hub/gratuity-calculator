import { watch } from 'fs';
import { execSync } from 'child_process';

const projectRoot = process.cwd();
const IGNORED_PATTERNS = ['.git', 'node_modules', 'dist', '.astro', '.DS_Store'];

let debounceTimer = null;
let isSyncing = false;

function shouldIgnore(filename) {
  if (!filename) return true;
  return IGNORED_PATTERNS.some(pattern => 
    filename === pattern || 
    filename.startsWith(`${pattern}/`) || 
    filename.startsWith(`${pattern}\\`) ||
    filename.includes(`/${pattern}/`) || 
    filename.includes(`\\${pattern}\\`)
  );
}

function syncToGitHub() {
  if (isSyncing) return;
  isSyncing = true;
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf-8' }).trim();
    if (!status) {
      isSyncing = false;
      return;
    }

    console.log(`\n[Auto-Sync] Detected file changes:\n${status}`);
    console.log('[Auto-Sync] Staging all changes...');
    execSync('git add -A', { stdio: 'inherit' });

    const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true });
    const commitMsg = `auto-sync: update ${now}`;
    console.log(`[Auto-Sync] Committing: "${commitMsg}"...`);
    execSync(`git commit -m "${commitMsg}"`, { stdio: 'inherit' });

    console.log('[Auto-Sync] Pushing to GitHub (origin main)...');
    execSync('git push origin main', { stdio: 'inherit' });
    console.log('[Auto-Sync] ✓ Successfully pushed to GitHub!\n');
  } catch (err) {
    console.error('[Auto-Sync] Error during sync:', err.message);
  } finally {
    isSyncing = false;
  }
}

console.log('----------------------------------------------------');
console.log('🚀 Git Auto-Push Watcher Active');
console.log(`📂 Repository: ${projectRoot}`);
console.log('🔗 Remote: https://github.com/kuldeep088-hub/gratuity-calculator.git');
console.log('⚡ Watching for file changes (auto-commits & pushes after 3s debounce)');
console.log('----------------------------------------------------');

watch(projectRoot, { recursive: true }, (eventType, filename) => {
  if (shouldIgnore(filename)) return;

  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    syncToGitHub();
  }, 3000);
});
