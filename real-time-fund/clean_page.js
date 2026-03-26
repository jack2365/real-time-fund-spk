const fs = require('fs');
let code = fs.readFileSync('app/page.jsx', 'utf8');

// 1. Remove UserIcon from Icons import
code = code.replace(/  UserIcon,\n/g, '');

// 2. Remove DonateModal, WeChatModal, githubImg imports
code = code.replace(/import DonateModal from \"\.\/components\/DonateModal\";\n/, '');
code = code.replace(/import WeChatModal from \"\.\/components\/WeChatModal\";\n/, '');
code = code.replace(/import githubImg from \"\.\/assets\/github\.svg\";\n/, '');

// 3. Remove GitHub Wrap
const ghStart = code.indexOf('{/* 补充 Github 项目地址 */}');
if (ghStart !== -1) {
  const ghEnd = code.indexOf('</span>', ghStart) + 8;
  code = code.substring(0, ghStart) + code.substring(ghEnd);
}

// 4. Remove User Menu Container
const userMenuStart = code.indexOf('{/* 用户菜单 */}');
if (userMenuStart !== -1) {
  const match = code.match(/\{\/\* 用户菜单 \*\/\}[\s\S]*?<\/AnimatePresence>\n          <\/div>/);
  if (match) {
    code = code.replace(match[0], '');
  }
}

// 5. Remove Donate / WeChat buttons
const donateStart = code.indexOf('{/* 赞赏 / 打赏 */}');
if (donateStart !== -1) {
  const match = code.match(/\{\/\* 赞赏 \/ 打赏 \*\/\}[\s\S]*?<\/button>/);
  if (match) {
    code = code.replace(match[0], '');
  }
}

// 6. Remove DonateModal and WeChatModal JSX rendering
code = code.replace(/\{weChatOpen && \([\s\S]*?<\/WeChatModal>\s*\)\}/g, '');
code = code.replace(/\{donateOpen && \([\s\S]*?<\/DonateModal>\s*\)\}/g, '');

fs.writeFileSync('app/page.jsx', code);
console.log('Done replacement');
