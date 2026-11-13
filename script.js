'use strict';

// Small, accessible interactions only: no scroll hijacking or animation libraries.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
function closeMenu() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
}
if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navigation.classList.toggle('is-open', open);
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
  document.addEventListener('click', event => {
    if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

// Real certificate images from the original portfolio, with no invented credentials.
const certificates = [
  { file: 'scaler-agentic-ai-certificate.jpg', title: 'Scaler · RAG vs AI Agents vs Agentic AI — Certificate of Participation' },
  { file: 'learntube-project-management-certificate.jpg', title: 'LearnTube.ai · Project Management Assessment — Certificate of Completion' },
  { file: 'nielit-yuva-ai-certificate.jpg', title: 'NIELIT · Yuva AI for All — Certificate for Skill Competency' },
  { file: 'microsoft-certificate.jpg', title: 'Microsoft Student Ambassadors Workshop — Completion' },
  { file: 'be10x-certificate.jpg', title: 'be10x · AI Tools & Claude Workshop — Completion' }
];
const dialog = document.querySelector('#certificate-dialog');
const dialogImage = dialog?.querySelector('.dialog-image-wrap img');
const dialogTitle = dialog?.querySelector('#dialog-title');
const dialogCounter = dialog?.querySelector('.dialog-counter');
let currentCertificate = 0;
let certificateTrigger = null;
function showCertificate(index) {
  currentCertificate = (index + certificates.length) % certificates.length;
  const certificate = certificates[currentCertificate];
  dialogImage.src = certificate.file;
  dialogImage.alt = certificate.title;
  dialogTitle.textContent = certificate.title;
  dialogCounter.textContent = `${currentCertificate + 1} / ${certificates.length}`;
}
if (dialog && dialogImage && typeof dialog.showModal === 'function') {
  document.querySelectorAll('[data-certificate]').forEach(button => {
    button.addEventListener('click', () => {
      certificateTrigger = button;
      showCertificate(Number(button.dataset.certificate));
      dialog.showModal();
      document.body.classList.add('modal-open');
    });
  });
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.dialog-prev').addEventListener('click', () => showCertificate(currentCertificate - 1));
  dialog.querySelector('.dialog-next').addEventListener('click', () => showCertificate(currentCertificate + 1));
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    dialogImage.removeAttribute('src');
    certificateTrigger?.focus();
  });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); showCertificate(currentCertificate - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showCertificate(currentCertificate + 1); }
  });
}

const toast = document.querySelector('.toast');
let toastTimeout;
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2600);
}
async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.cssText = 'position:fixed;opacity:0;left:-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand('copy');
  textarea.remove();
  if (!copied) throw new Error('Copy not supported');
}
document.querySelectorAll('[data-copy-email]').forEach(button => {
  button.addEventListener('click', async () => {
    try { await copyText(button.dataset.copyEmail); showToast('Email address copied'); }
    catch { showToast('Could not copy. You can use the email link above.'); }
  });
});
