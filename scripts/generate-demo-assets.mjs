import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const rootDir = process.cwd();
const sourceImage = path.resolve(rootDir, '图片素材', '页面demo.jpg');
const clientAssetsDir = path.resolve(rootDir, 'client', 'public', 'demo-assets');
const serverImagesDir = path.resolve(rootDir, 'server', 'public', 'images');

const cropJobs = [
  // Header
  { key: 'header.logo_wordmark', out: ['client', 'header', 'logo-wordmark.png'], rect: { left: 520, top: 8, width: 300, height: 90 } },
  { key: 'header.nav_home', out: ['client', 'header', 'nav-home.png'], rect: { left: 995, top: 5, width: 150, height: 88 } },
  { key: 'header.nav_plan', out: ['client', 'header', 'nav-plan.png'], rect: { left: 1170, top: 5, width: 190, height: 88 } },
  { key: 'header.nav_map', out: ['client', 'header', 'nav-map.png'], rect: { left: 1390, top: 5, width: 190, height: 88 } },
  { key: 'header.nav_mall', out: ['client', 'header', 'nav-mall.png'], rect: { left: 1608, top: 5, width: 190, height: 88 } },
  { key: 'header.nav_community', out: ['client', 'header', 'nav-community.png'], rect: { left: 1820, top: 5, width: 205, height: 88 } },
  { key: 'header.user_avatar', out: ['client', 'header', 'user-avatar.png'], rect: { left: 2050, top: 6, width: 80, height: 80 } },

  // Plan tabs
  { key: 'plans.qingmiao', out: ['client', 'plans', 'qingmiao-tab.png'], rect: { left: 665, top: 98, width: 320, height: 85 } },
  { key: 'plans.guiyan', out: ['client', 'plans', 'guiyan-tab.png'], rect: { left: 1005, top: 98, width: 300, height: 85 } },
  { key: 'plans.sangyu', out: ['client', 'plans', 'sangyu-tab.png'], rect: { left: 1318, top: 98, width: 300, height: 85 } },

  // Region buttons
  { key: 'regions.yanzhao', out: ['client', 'regions', 'yanzhao-btn.png'], rect: { left: 82, top: 194, width: 358, height: 95 } },
  { key: 'regions.sanyuan', out: ['client', 'regions', 'sanyuan-btn.png'], rect: { left: 82, top: 333, width: 358, height: 95 } },
  { key: 'regions.wuyue', out: ['client', 'regions', 'wuyue-btn.png'], rect: { left: 82, top: 471, width: 358, height: 95 } },
  { key: 'regions.guangdong', out: ['client', 'regions', 'guangdong-btn.png'], rect: { left: 82, top: 607, width: 358, height: 95 } },
  { key: 'regions.xinjiang', out: ['client', 'regions', 'xinjiang-btn.png'], rect: { left: 82, top: 742, width: 358, height: 95 } },

  // Course covers -> server/public/images
  { key: 'courses.xiaoxue_001', out: ['server', 'xiaoxue-001.png'], rect: { left: 900, top: 474, width: 360, height: 190 } },
  { key: 'courses.xiaoxue_002', out: ['server', 'xiaoxue-002.png'], rect: { left: 1280, top: 474, width: 360, height: 190 } },
  { key: 'courses.chuxue_001', out: ['server', 'chuxue-001.png'], rect: { left: 900, top: 763, width: 360, height: 190 } },
  { key: 'courses.chuxue_002', out: ['server', 'chuxue-002.png'], rect: { left: 1280, top: 763, width: 360, height: 190 } },
  { key: 'courses.gaoxue_001', out: ['server', 'gaoxue-001.png'], rect: { left: 900, top: 1048, width: 360, height: 190 } },
  { key: 'courses.gaoxue_002', out: ['server', 'gaoxue-002.png'], rect: { left: 1280, top: 1048, width: 360, height: 190 } },
  { key: 'courses.daxue_001', out: ['server', 'daxue-001.png'], rect: { left: 900, top: 1338, width: 360, height: 170 } },
  { key: 'courses.daxue_002', out: ['server', 'daxue-002.png'], rect: { left: 1280, top: 1338, width: 360, height: 170 } },

  // Recommendation panel / misc
  { key: 'recommend.banner_top', out: ['client', 'recommend', 'banner-top.png'], rect: { left: 2180, top: 322, width: 430, height: 190 } },
  { key: 'recommend.switch_btn', out: ['client', 'recommend', 'switch-btn.png'], rect: { left: 2280, top: 1260, width: 270, height: 120 } },

  // Background fragments
  { key: 'background.left_mountain', out: ['client', 'backgrounds', 'left-mountain.png'], rect: { left: 0, top: 1290, width: 500, height: 246 } },
  { key: 'background.right_mountain', out: ['client', 'backgrounds', 'right-mountain.png'], rect: { left: 2320, top: 1290, width: 410, height: 246 } },
  { key: 'background.header_strip', out: ['client', 'backgrounds', 'header-strip.png'], rect: { left: 0, top: 0, width: 2730, height: 96 } }
];

function resolveOutPath(out) {
  if (out[0] === 'client') {
    return path.resolve(clientAssetsDir, ...out.slice(1));
  }
  return path.resolve(serverImagesDir, ...out.slice(1));
}

async function main() {
  await mkdir(clientAssetsDir, { recursive: true });
  await mkdir(serverImagesDir, { recursive: true });

  const image = sharp(sourceImage);
  const metadata = await image.metadata();

  const manifest = {
    source: path.relative(rootDir, sourceImage),
    width: metadata.width,
    height: metadata.height,
    generatedAt: new Date().toISOString(),
    assets: {}
  };

  for (const job of cropJobs) {
    const { left, top, width, height } = job.rect;

    if (
      left < 0 ||
      top < 0 ||
      left + width > metadata.width ||
      top + height > metadata.height
    ) {
      throw new Error(`裁剪区域越界: ${job.key}`);
    }

    const outputPath = resolveOutPath(job.out);
    await mkdir(path.dirname(outputPath), { recursive: true });

    await sharp(sourceImage)
      .extract({ left, top, width, height })
      .png({ quality: 95 })
      .toFile(outputPath);

    manifest.assets[job.key] = path.relative(rootDir, outputPath).replace(/\\/g, '/');
  }

  const fullPageOutput = path.resolve(clientAssetsDir, 'backgrounds', 'page-full.jpg');
  await mkdir(path.dirname(fullPageOutput), { recursive: true });
  await sharp(sourceImage).jpeg({ quality: 92 }).toFile(fullPageOutput);
  manifest.assets['background.page_full'] = path.relative(rootDir, fullPageOutput).replace(/\\/g, '/');

  const manifestPath = path.resolve(clientAssetsDir, 'manifest.json');
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');

  console.log(`✅ 已生成 ${Object.keys(manifest.assets).length} 个素材`);
  console.log(`📄 清单: ${path.relative(rootDir, manifestPath)}`);
}

main().catch((error) => {
  console.error('❌ 切图失败:', error.message);
  process.exit(1);
});
