const fs = require('fs');
let code = fs.readFileSync('app/page.jsx', 'utf8');

// List of exact strings to remove:

const chunks = [
  '  UserIcon,\\n',
  'import DonateModal from "./components/DonateModal";\\n',
  'import WeChatModal from "./components/WeChatModal";\\n',
  'import githubImg from "./assets/github.svg";\\n',
  
  `          {/* 补充 Github 项目地址 */}
          <span className="github-icon-wrap">
            <Image unoptimized alt="项目Github地址" src={githubImg} style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => window.open("https://github.com/hzm0321/real-time-fund")} />
          </span>`,

  `          {/* 赞赏 / 打赏 */}
          <button
            className="icon-button"
            aria-label="请杯咖啡"
            onClick={() => setDonateOpen(true)}
            title="请杯咖啡"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
              <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
            </svg>
          </button>`,

  `          {/* 微信交流 */}
          <button
            className="icon-button"
            aria-label="微信交流"
            onClick={() => setWeChatOpen(true)}
            title="微信交流"
          >
             <WechatIcon width="20" height="20" />
          </button>`,

  `        {weChatOpen && (
          <WeChatModal onClose={() => setWeChatOpen(false)} />
        )}`,
  
  `        {donateOpen && (
          <DonateModal onClose={() => setDonateOpen(false)} />
        )}`
];

for (let chunk of chunks) {
  // Replace the literal string. We parse \\n in the simple ones.
  let target = chunk.replace(/\\\\n/g, '\\n');
  if (code.includes(target)) {
    code = code.replace(target, '');
  } else {
    // try removing leading/trailing spacing issues by partial match if exact fails
    // actually, multiline exact match works perfectly with raw strings!
    console.warn("Could not find exact chunk:", target.substring(0, 30));
  }
}

// User menu is large, we do a careful substring replacement using well-known boundaries
const umStart = code.indexOf('{/* 用户菜单 */}');
if (umStart !== -1) {
  const umEndStr = '</AnimatePresence>\\n          </div>';
  const umEnd = code.indexOf(umEndStr, umStart);
  if (umEnd !== -1) {
    code = code.substring(0, umStart) + code.substring(umEnd + umEndStr.replace(/\\\\n/g, '\\n').length);
  } else {
    console.warn("User menu end not found");
  }
}

fs.writeFileSync('app/page.jsx', code);
console.log('Safe replacement complete.');
