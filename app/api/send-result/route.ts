import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { careers } from '@/data/careers';

export async function POST(request: NextRequest) {
  try {
    const { email, careerId, scores } = await request.json();

    if (!email || !careerId) {
      return NextResponse.json(
        { error: 'Email and careerId are required' },
        { status: 400 }
      );
    }

    const career = careers.find((c) => c.id === careerId);
    if (!career) {
      return NextResponse.json({ error: 'Career not found' }, { status: 404 });
    }

    // メールトランスポーターの設定
    // 環境変数から読み込み、設定されていない場合はEthereal（テスト用）を使用
    let transporter;

    if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      // 本番環境: 実際のSMTPサーバーを使用
      transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: process.env.EMAIL_PORT === '465',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    } else {
      // 開発環境: Etherealテストアカウントを使用
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    // メール本文の作成
    const htmlContent = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI職業診断結果</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f5f5f5;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
      color: white;
      padding: 40px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
    }
    .icon {
      font-size: 60px;
      margin: 20px 0;
    }
    .content {
      padding: 40px 30px;
    }
    .career-name {
      font-size: 32px;
      font-weight: bold;
      color: ${career.color};
      margin-bottom: 10px;
      text-align: center;
    }
    .career-name-en {
      font-size: 18px;
      color: #666;
      margin-bottom: 30px;
      text-align: center;
    }
    .section {
      margin-bottom: 30px;
    }
    .section-title {
      font-size: 20px;
      font-weight: bold;
      color: #1f2937;
      margin-bottom: 15px;
      padding-left: 12px;
      border-left: 4px solid ${career.color};
    }
    .description {
      background-color: #f9fafb;
      padding: 20px;
      border-radius: 8px;
      line-height: 1.8;
    }
    .skills-list, .traits-list {
      list-style: none;
      padding: 0;
    }
    .skills-list li, .traits-list li {
      padding: 10px;
      margin-bottom: 8px;
      background-color: #f3f4f6;
      border-radius: 6px;
      display: flex;
      align-items: center;
    }
    .skills-list li:before {
      content: "✓";
      color: ${career.color};
      font-weight: bold;
      margin-right: 12px;
      font-size: 18px;
    }
    .traits-list li:before {
      content: "✨";
      margin-right: 12px;
      font-size: 16px;
    }
    .scores {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-top: 20px;
    }
    .score-item {
      background-color: #f9fafb;
      padding: 15px;
      border-radius: 8px;
      text-align: center;
    }
    .score-label {
      font-size: 12px;
      color: #6b7280;
      margin-bottom: 5px;
    }
    .score-value {
      font-size: 24px;
      font-weight: bold;
      color: ${career.color};
    }
    .career-path {
      background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
      padding: 20px;
      border-radius: 8px;
      font-size: 16px;
      line-height: 1.8;
    }
    .cta {
      text-align: center;
      margin-top: 40px;
      padding-top: 30px;
      border-top: 2px solid #e5e7eb;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
      color: white;
      padding: 15px 40px;
      text-decoration: none;
      border-radius: 25px;
      font-weight: bold;
      font-size: 16px;
    }
    .footer {
      background-color: #f9fafb;
      padding: 20px;
      text-align: center;
      color: #6b7280;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎯 AI Career Navigator</h1>
      <p>あなたのAI職業診断結果</p>
    </div>

    <div class="content">
      <div class="icon">${career.icon}</div>
      <div class="career-name">${career.name}</div>
      <div class="career-name-en">${career.nameEn}</div>

      <div class="section">
        <div class="section-title">職業の特徴</div>
        <div class="description">${career.description}</div>
      </div>

      ${scores ? `
      <div class="section">
        <div class="section-title">あなたのスコア</div>
        <div class="scores">
          <div class="score-item">
            <div class="score-label">Logical - Creative</div>
            <div class="score-value">${scores['L-C'] > 0 ? 'L' : 'C'} ${Math.abs(scores['L-C'])}</div>
          </div>
          <div class="score-item">
            <div class="score-label">Technical - Strategic</div>
            <div class="score-value">${scores['T-S'] > 0 ? 'T' : 'S'} ${Math.abs(scores['T-S'])}</div>
          </div>
          <div class="score-item">
            <div class="score-label">Independent - Collaborative</div>
            <div class="score-value">${scores['I-C'] > 0 ? 'I' : 'C'} ${Math.abs(scores['I-C'])}</div>
          </div>
          <div class="score-item">
            <div class="score-label">Research - Business</div>
            <div class="score-value">${scores['R-B'] > 0 ? 'R' : 'B'} ${Math.abs(scores['R-B'])}</div>
          </div>
        </div>
      </div>
      ` : ''}

      <div class="section">
        <div class="section-title">必要なスキル</div>
        <ul class="skills-list">
          ${career.skills.map(skill => `<li>${skill}</li>`).join('')}
        </ul>
      </div>

      <div class="section">
        <div class="section-title">こんな人に向いています</div>
        <ul class="traits-list">
          ${career.traits.map(trait => `<li>${trait}</li>`).join('')}
        </ul>
      </div>

      <div class="section">
        <div class="section-title">キャリアパス</div>
        <div class="career-path">
          🚀 ${career.careerPath}
        </div>
      </div>

      <div class="cta">
        <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/result/${career.id}" class="button">
          詳細を見る
        </a>
      </div>
    </div>

    <div class="footer">
      <p>© 2025 AI Career Navigator. All rights reserved.</p>
      <p>あなたのAIキャリアを応援します。</p>
    </div>
  </div>
</body>
</html>
    `;

    const textContent = `
AI Career Navigator - 診断結果

あなたに最適なAI職業: ${career.name} (${career.nameEn})

【職業の特徴】
${career.description}

【必要なスキル】
${career.skills.map((skill, i) => `${i + 1}. ${skill}`).join('\n')}

【こんな人に向いています】
${career.traits.map((trait, i) => `${i + 1}. ${trait}`).join('\n')}

【キャリアパス】
${career.careerPath}

詳細: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/result/${career.id}

---
AI Career Navigator
© 2025 All rights reserved.
    `;

    // メール送信
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"AI Career Navigator" <noreply@aicareer.example.com>',
      to: email,
      subject: `【AI Career Navigator】診断結果: ${career.name}`,
      text: textContent,
      html: htmlContent,
    });

    console.log('Message sent: %s', info.messageId);

    // Etherealの場合、プレビューURLを返す
    const previewURL = nodemailer.getTestMessageUrl(info);
    if (previewURL) {
      console.log('Preview URL: %s', previewURL);
      return NextResponse.json({
        success: true,
        message: 'メールを送信しました（テストモード）',
        previewURL: previewURL,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'メールを送信しました',
    });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'メール送信に失敗しました', details: (error as Error).message },
      { status: 500 }
    );
  }
}
