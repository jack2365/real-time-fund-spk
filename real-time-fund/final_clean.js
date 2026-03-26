const fs = require('fs');
let code = fs.readFileSync('app/page.jsx', 'utf8');

// 1. Remove UserIcon from Icons import
code = code.replace(/  UserIcon,\n/g, '');

// 2. Remove DonateModal, WeChatModal, githubImg imports
code = code.replace(/import DonateModal from "\.\/components\/DonateModal";\n/, '');
code = code.replace(/import WeChatModal from "\.\/components\/WeChatModal";\n/, '');
code = code.replace(/import githubImg from "\.\/assets\/github\.svg";\n/, '');

// 3. Remove GitHub Wrap
let idx = code.indexOf('<span className="github-icon-wrap">');
if (idx !== -1) {
  let endIdx = code.indexOf('</span>', idx) + 7;
  // delete the preceding newline and spacing
  let startIdx = code.lastIndexOf('\n', idx);
  code = code.substring(0, startIdx) + code.substring(endIdx);
}

// 4. Remove User Menu Container
idx = code.indexOf('<div className="user-menu-container"');
if (idx !== -1) {
  let endMarker = '</AnimatePresence>\n          </div>';
  let endIdx = code.indexOf(endMarker, idx) + endMarker.length;
  let startIdx = code.lastIndexOf('{/* 用户菜单 */}', idx);
  if (startIdx === -1) startIdx = code.lastIndexOf('\n', idx);
  else startIdx = code.lastIndexOf('\n', startIdx);
  code = code.substring(0, startIdx) + code.substring(endIdx);
}

// 5. Remove Donate / WeChat buttons
idx = code.indexOf('aria-label="请杯咖啡"');
if (idx !== -1) {
  let startIdx = code.lastIndexOf('<button', idx);
  let endIdx = code.indexOf('</button>', idx) + 9;
  let commentIdx = code.lastIndexOf('{/* 赞赏 / 打赏 */}', startIdx);
  if (commentIdx !== -1 && commentIdx > startIdx - 100) startIdx = commentIdx;
  startIdx = code.lastIndexOf('\n', startIdx);
  code = code.substring(0, startIdx) + code.substring(endIdx);
}

idx = code.indexOf('aria-label="微信交流"');
if (idx !== -1) {
  let startIdx = code.lastIndexOf('<button', idx);
  let endIdx = code.indexOf('</button>', idx) + 9;
  let commentIdx = code.lastIndexOf('{/* 微信交流 */}', startIdx);
  if (commentIdx !== -1 && commentIdx > startIdx - 100) startIdx = commentIdx;
  startIdx = code.lastIndexOf('\n', startIdx);
  code = code.substring(0, startIdx) + code.substring(endIdx);
}

// 6. Remove DonateModal and WeChatModal JSX rendering
code = code.replace(/        \{weChatOpen && \([\s\S]*?<WeChatModal[\s\S]*?\/>\n        \)\}\n/g, '');
code = code.replace(/        \{donateOpen && \([\s\S]*?<DonateModal[\s\S]*?\/>\n        \)\}\n/g, '');

fs.writeFileSync('app/page.jsx', code);
console.log('Script ran successfully!');
