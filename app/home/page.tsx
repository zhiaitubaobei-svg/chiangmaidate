"use client";

import { useEffect, useState } from "react";

type AppLanguage = "chinese" | "english" | "thai";
type UserGender = "male" | "female";

type HomePageProps = {
  totalUsersInMatching?: number;
  lastWeekMatchedPairs?: number;
  currentWeekUsersInMatching?: number;
  joinedThisWeekMatching?: boolean;
  hasMatchResult?: boolean;
  matchedReason?: string;
  matchedEmail?: string;
};

function gradientStyle(colors: string[]) {
  return {
    backgroundImage: `linear-gradient(135deg, ${colors.join(", ")})`,
  } as const;
}

function alphaColor(hex: string, alpha: string) {
  return `${hex}${alpha}`;
}

function pageBackgroundStyle(isMaleTheme: boolean) {
  return {
    backgroundImage: isMaleTheme
      ? "linear-gradient(180deg, rgb(240,247,255) 0%, rgb(230,240,252) 100%)"
      : "linear-gradient(180deg, rgb(252,247,252) 0%, rgb(242,242,255) 100%)",
  } as const;
}

function orbStyle(color: string, size: number, blur: number, x: number, y: number) {
  return {
    backgroundColor: color,
    width: `${size}px`,
    height: `${size}px`,
    filter: `blur(${blur}px)`,
    transform: `translate(${x}px, ${y}px)`,
  } as const;
}

function getContent(
  selectedLanguage: AppLanguage,
  joinedThisWeekMatching: boolean,
  hasMatchResult: boolean,
) {
  return {
    heroBadgeText: "Questionnaire · Daypet · Weekly Match",
    heroTitleText:
      selectedLanguage === "chinese"
        ? "遇见能理解你的那个人，在清迈。"
        : selectedLanguage === "english"
          ? "Meet the one who understands you in Chiang Mai."
          : "พบคนที่เข้าใจคุณในเชียงใหม่",
    heroPrimaryButtonText:
      selectedLanguage === "chinese"
        ? "开始本轮问卷"
        : selectedLanguage === "english"
          ? "Start This Round's Questionnaire"
          : "เริ่มแบบสอบถามรอบนี้",
    heroSecondaryButtonText:
      selectedLanguage === "chinese"
        ? "查看本周结果"
        : selectedLanguage === "english"
          ? "View This Week's Result"
          : "ดูผลของสัปดาห์นี้",
    activeStatusPillText:
      selectedLanguage === "chinese"
        ? joinedThisWeekMatching
          ? "已加入本周匹配"
          : "尚未加入本周匹配"
        : selectedLanguage === "english"
          ? joinedThisWeekMatching
            ? "Joined This Week"
            : "Not Joined Yet"
          : joinedThisWeekMatching
            ? "เข้าร่วมแล้วสัปดาห์นี้"
            : "ยังไม่ได้เข้าร่วม",
    navigationTitleText:
      selectedLanguage === "chinese"
        ? "主页"
        : selectedLanguage === "english"
          ? "Home"
          : "หน้าหลัก",
    introBodyText:
      selectedLanguage === "chinese"
        ? "ChiangMai Date 不是靠滑动头像和反复试探来找人。先用 AI 问卷了解长期的你，再通过 Daypet 补充这周的你。系统会同时参考你的画像与最近状态，在每周三下午 2 点进行匹配，让相遇更接近真正适合你的时刻。"
        : selectedLanguage === "english"
          ? "ChiangMai Date does not rely on endless swiping or repeated guessing. First, the AI questionnaire understands your long-term self. Then Daypet adds who you are this week. The system uses both your profile and recent state to match every Wednesday at 2 PM, so each meeting feels closer to the right moment for you."
          : "ChiangMai Date ไม่ได้พาคุณหาคู่ด้วยการปัดโปรไฟล์ไม่รู้จบหรือการลองผิดลองถูก ระบบจะเริ่มจากแบบสอบถาม AI เพื่อเข้าใจตัวตนระยะยาวของคุณ แล้วใช้ Daypet เพื่อเติมภาพของตัวคุณในสัปดาห์นี้ จากนั้นจะอ้างอิงทั้งโปรไฟล์และสถานะล่าสุดของคุณเพื่อจับคู่ทุกวันพุธเวลา 14:00 น. เพื่อให้การพบกันใกล้เคียงกับจังหวะที่เหมาะกับคุณจริง ๆ มากขึ้น",
    statsTitleText:
      selectedLanguage === "chinese"
        ? "匹配数据"
        : selectedLanguage === "english"
          ? "Matching Stats"
          : "สถิติการจับคู่",
    totalUsersLabelText:
      selectedLanguage === "chinese"
        ? "上周参与"
        : selectedLanguage === "english"
          ? "Joined last week"
          : "เข้าร่วมสัปดาห์ที่แล้ว",
    lastWeekPairsLabelText:
      selectedLanguage === "chinese"
        ? "匹配成功"
        : selectedLanguage === "english"
          ? "Matched successfully"
          : "จับคู่สำเร็จ",
    currentWeekUsersLabelText:
      selectedLanguage === "chinese"
        ? "本周参与"
        : selectedLanguage === "english"
          ? "Joined this week"
          : "เข้าร่วมสัปดาห์นี้",
    questionnaireTitleText:
      selectedLanguage === "chinese"
        ? "AI 问卷"
        : selectedLanguage === "english"
          ? "AI Questionnaire"
          : "แบบสอบถาม AI",
    questionnaireBodyText:
      selectedLanguage === "chinese"
        ? "进行场景直觉及问卷测试，只需要 3 分钟，完成后提交将会参加每周三下午 2 点的全局匹配。"
        : selectedLanguage === "english"
          ? "Complete the scenario intuition and questionnaire test in just 3 minutes. After submission, you will join the global matching every Wednesday at 2 PM."
          : "ทำแบบทดสอบการรับรู้สถานการณ์และแบบสอบถาม ใช้เวลาเพียง 3 นาที หลังส่งเสร็จ คุณจะเข้าร่วมการจับคู่รวมทุกวันพุธเวลา 14:00 น.",
    questionnaireButtonText:
      selectedLanguage === "chinese"
        ? "进入 AI 问卷"
        : selectedLanguage === "english"
          ? "Start AI Questionnaire"
          : "เริ่มแบบสอบถาม AI",
    daypetTitleText: "Daypet",
    daypetBodyText:
      selectedLanguage === "chinese"
        ? "问卷会帮助系统理解长期的你，Daypet 会补充这周的你。你对小团子说的话，会进入本周匹配，让结果更接近真正适合你的时刻。"
        : selectedLanguage === "english"
          ? "The questionnaire helps the system understand your long-term self, while Daypet adds who you are this week. What you tell your little pet will enter this week’s matching, so the result feels closer to the right moment for you."
          : "แบบสอบถามจะช่วยให้ระบบเข้าใจตัวตนระยะยาวของคุณ ส่วน Daypet จะเติมภาพของตัวคุณในสัปดาห์นี้ สิ่งที่คุณเล่าให้เจ้าตัวน้อยฟังจะถูกนำไปใช้ในการจับคู่ประจำสัปดาห์ เพื่อให้ผลลัพธ์ใกล้เคียงกับจังหวะที่เหมาะกับคุณจริง ๆ มากขึ้น",
    daypetButtonText:
      selectedLanguage === "chinese"
        ? "去找小团子"
        : selectedLanguage === "english"
          ? "Go to Daypet"
          : "ไปหา Daypet",
    weeklyStatusTitleText:
      selectedLanguage === "chinese"
        ? "本周匹配状态"
        : selectedLanguage === "english"
          ? "This Week's Matching Status"
          : "สถานะการจับคู่สัปดาห์นี้",
    joinedStatusText:
      selectedLanguage === "chinese"
        ? "你已参加本周 AI 匹配。"
        : selectedLanguage === "english"
          ? "You have joined this week's AI matching."
          : "คุณได้เข้าร่วมการจับคู่ AI ของสัปดาห์นี้แล้ว",
    notJoinedStatusText:
      selectedLanguage === "chinese"
        ? "你还没有参加本周的 AI 匹配。"
        : selectedLanguage === "english"
          ? "You have not joined this week's AI matching yet."
          : "คุณยังไม่ได้เข้าร่วมการจับคู่ AI ของสัปดาห์นี้",
    joinThisWeekButtonText:
      selectedLanguage === "chinese"
        ? "参加本周 AI 匹配"
        : selectedLanguage === "english"
          ? "Join This Week's AI Matching"
          : "เข้าร่วมการจับคู่ AI สัปดาห์นี้",
    matchResultTitleText:
      selectedLanguage === "chinese"
        ? hasMatchResult
          ? "匹配成功"
          : "匹配结果"
        : selectedLanguage === "english"
          ? hasMatchResult
            ? "Successful Match"
            : "Match Result"
          : hasMatchResult
            ? "จับคู่สำเร็จ"
            : "ผลการจับคู่",
    noMatchResultText:
      selectedLanguage === "chinese"
        ? joinedThisWeekMatching
          ? "当前暂时无匹配结果，请先运行本周匹配后再查看。"
          : "你当前还没有参加本周匹配。"
        : selectedLanguage === "english"
          ? joinedThisWeekMatching
            ? "There is no match result yet. Please run this week's matching first and check again."
            : "You have not joined this week's matching yet."
          : joinedThisWeekMatching
            ? "ขณะนี้ยังไม่มีผลการจับคู่ กรุณาเริ่มการจับคู่ประจำสัปดาห์ก่อนแล้วค่อยกลับมาตรวจสอบอีกครั้ง"
            : "ขณะนี้คุณยังไม่ได้เข้าร่วมการจับคู่ของสัปดาห์นี้",
    reasonLabelText:
      selectedLanguage === "chinese"
        ? "匹配原因"
        : selectedLanguage === "english"
          ? "Why you matched"
          : "เหตุผลที่คุณจับคู่สำเร็จ",
    emailLabelText:
      selectedLanguage === "chinese"
        ? "对方邮箱"
        : selectedLanguage === "english"
          ? "Partner's Email"
          : "อีเมลของคู่แมตช์",
    viewMatchResultButtonText:
      selectedLanguage === "chinese"
        ? "查看匹配结果"
        : selectedLanguage === "english"
          ? "View Match Result"
          : "ดูผลการจับคู่",
    runMatchingTitleText:
      selectedLanguage === "chinese"
        ? "测试匹配引擎"
        : selectedLanguage === "english"
          ? "Test Matching Engine"
          : "ทดสอบระบบจับคู่",
    runMatchingButtonText:
      selectedLanguage === "chinese"
        ? "运行本周匹配"
        : selectedLanguage === "english"
          ? "Run Weekly Matching"
          : "เริ่มจับคู่ประจำสัปดาห์",
    aboutUsButtonText:
      selectedLanguage === "chinese"
        ? "关于我们"
        : selectedLanguage === "english"
          ? "About Us"
          : "เกี่ยวกับเรา",
    portraitButtonText:
      selectedLanguage === "chinese"
        ? "画像补充"
        : selectedLanguage === "english"
          ? "Portrait"
          : "โปรไฟล์เสริม",
    profileButtonText:
      selectedLanguage === "chinese"
        ? "个人中心"
        : selectedLanguage === "english"
          ? "Profile"
          : "โปรไฟล์",
    quickEntryTitleText:
      selectedLanguage === "chinese"
        ? "更多入口"
        : selectedLanguage === "english"
          ? "More"
          : "ทางเข้าเพิ่มเติม",
  };
}

function PremiumButton({
  title,
  gradient,
  href,
}: {
  title: string;
  gradient: string[];
  href: string;
}) {
  return (
    <a
      href={href}
      className="block w-full rounded-[18px] px-4 py-4 text-center text-[16px] font-bold text-white shadow-[0_8px_18px_rgba(31,41,55,0.14)] sm:rounded-[20px] sm:py-[17px] sm:text-[17px]"
      style={gradientStyle(gradient)}
    >
      {title}
    </a>
  );
}

function PremiumLabel({
  text,
  softAccentFill,
}: {
  text: string;
  softAccentFill: string;
}) {
  return (
    <span
      className="inline-flex rounded-full px-[10px] py-2 text-[12px] font-bold tracking-[0.8px] text-black/60"
      style={{ backgroundColor: softAccentFill }}
    >
      {text}
    </span>
  );
}

function InfoCard({
  title,
  systemImage,
  primaryAccent,
  softAccentFill,
  children,
}: {
  title: string;
  systemImage: string;
  primaryAccent: string;
  softAccentFill: string;
  children: React.ReactNode;
}) {
  return (
    <section className="w-full rounded-[24px] border border-white/70 bg-white/82 p-5 shadow-[0_14px_28px_rgba(15,23,42,0.06)] backdrop-blur-[20px] sm:rounded-[28px] sm:p-6">
      <div className="flex items-center gap-3">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-[14px] sm:h-[54px] sm:w-[54px] sm:rounded-[16px]"
          style={{ backgroundColor: softAccentFill }}
        >
          <span className="text-[20px] font-bold leading-none sm:text-[22px]" style={{ color: primaryAccent }}>
            {systemImage}
          </span>
        </div>
        <h2 className="text-[24px] font-black tracking-[-0.02em] text-black/90 sm:text-[28px]">{title}</h2>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function CompactStatCard({
  title,
  value,
  tint,
  icon,
}: {
  title: string;
  value: string;
  tint: string;
  icon: string;
}) {
  return (
    <div
      className="flex-1 rounded-[20px] px-[10px] py-[14px] text-center"
      style={{ backgroundColor: alphaColor(tint, "14") }}
    >
      <div
        className="mx-auto flex h-10 w-10 items-center justify-center rounded-full"
        style={{ backgroundColor: alphaColor(tint, "24") }}
      >
        <span className="text-sm font-bold" style={{ color: tint }}>
          {icon}
        </span>
      </div>
      <div className="mt-[10px] text-[22px] font-black text-black/90 sm:text-2xl">{value}</div>
      <div className="mt-1 text-[11px] font-medium leading-4 text-black/50 sm:text-[12px]">{title}</div>
    </div>
  );
}

function HomeBottomButton({
  title,
  icon,
  tint,
  href,
}: {
  title: string;
  icon: string;
  tint: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="flex min-h-[92px] flex-1 flex-col items-center justify-center rounded-[16px] bg-white/60 px-2 py-[10px] text-center sm:min-h-[98px] sm:rounded-[18px]"
    >
      <div
        className="flex h-11 w-11 items-center justify-center rounded-xl sm:h-[52px] sm:w-[52px]"
        style={{ backgroundColor: alphaColor(tint, "1F") }}
      >
        <span className="text-[22px] font-bold sm:text-2xl" style={{ color: tint }}>
          {icon}
        </span>
      </div>
      <div className="mt-2 text-[12px] font-semibold leading-4 text-black/80 sm:text-[13px]">{title}</div>
    </a>
  );
}

function HeroSection({
  isMaleTheme,
  heroGradient,
  heroGlowGradient,
  heroBadgeText,
  heroTitleText,
  introBodyText,
  heroIconSymbol,
}: {
  isMaleTheme: boolean;
  heroGradient: string[];
  heroGlowGradient: string[];
  heroBadgeText: string;
  heroTitleText: string;
  introBodyText: string;
  heroIconSymbol: string;
}) {
  return (
    <section
      className="relative overflow-hidden rounded-[28px] px-5 pb-6 pt-5 text-white shadow-[0_18px_36px_rgba(82,46,112,0.22)] sm:rounded-[34px] sm:px-6 sm:pb-7 sm:pt-6"
      style={gradientStyle(heroGradient)}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={gradientStyle(heroGlowGradient)}
      />
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-[150px] w-[150px] rounded-full blur-[12px] sm:-right-4 sm:-top-5 sm:h-[170px] sm:w-[170px]"
        style={{
          backgroundColor: isMaleTheme ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.16)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-6 -left-6 h-[118px] w-[118px] rounded-full blur-[14px] sm:-bottom-5 sm:-left-5 sm:h-[138px] sm:w-[138px]"
        style={{
          backgroundColor: isMaleTheme ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.10)",
        }}
      />

      <div className="relative">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <div
              className="inline-flex rounded-full px-4 py-2.5 text-[11px] font-bold tracking-[1.2px] text-white sm:px-5 sm:py-3 sm:text-[12px] sm:tracking-[1.6px]"
              style={{
                backgroundColor: isMaleTheme ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.18)",
              }}
            >
              {heroBadgeText}
            </div>
            <h1 className="mt-4 text-[28px] font-black leading-[1.12] tracking-[-0.03em] text-white sm:mt-5 sm:text-[34px]">
              {heroTitleText}
            </h1>
          </div>
          <div
            className="flex h-[64px] w-[64px] items-center justify-center rounded-full sm:h-[76px] sm:w-[76px]"
            style={{
              backgroundColor: isMaleTheme ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.14)",
            }}
          >
            <span className="text-[28px] font-bold leading-none sm:text-[34px]">{heroIconSymbol}</span>
          </div>
        </div>

        <p className="mt-6 text-[15px] font-medium leading-[1.8] text-white/92 sm:mt-8 sm:text-[17px] sm:leading-[1.75]">
          {introBodyText}
        </p>
      </div>
    </section>
  );
}

export default function HomePage({
  totalUsersInMatching = 128,
  lastWeekMatchedPairs = 36,
  currentWeekUsersInMatching = 24,
  joinedThisWeekMatching = false,
  hasMatchResult = false,
  matchedReason = "你们在价值观、沟通方式与约会目标上有较高一致性。",
  matchedEmail = "match@chaingmaidate.com",
}: HomePageProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<AppLanguage>("chinese");
  const [selectedGender, setSelectedGender] = useState<UserGender>("male");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage") as AppLanguage | null;
    const savedGender = localStorage.getItem("selectedGender") as UserGender | null;

    if (savedLanguage) setSelectedLanguage(savedLanguage);
    if (savedGender) setSelectedGender(savedGender);
  }, []);

  const isMaleTheme = selectedGender === "male";
  const heroGradient = isMaleTheme
    ? ["rgb(20,31,56)", "rgb(43,99,184)"]
    : ["rgb(255,120,171)", "rgb(125,84,242)"];
  const heroGlowGradient = isMaleTheme
    ? ["rgba(255,255,255,0.12)", "rgba(255,255,255,0.02)"]
    : ["rgba(255,255,255,0.24)", "rgba(255,255,255,0.04)"];
  const primaryAccent = isMaleTheme ? "#3882F5" : "#FC63B8";
  const secondaryAccent = isMaleTheme ? "#63C7FF" : "#7D54F2";
  const softAccentFill = isMaleTheme ? "rgba(56,130,245,0.12)" : "rgba(255,105,180,0.12)";
  const pillBackgroundColor = isMaleTheme ? "rgba(56,130,245,0.14)" : "rgba(255,105,180,0.12)";
  const backgroundOrbLeading = isMaleTheme ? "rgba(59,130,246,0.12)" : "rgba(255,105,180,0.10)";
  const backgroundOrbTrailing = isMaleTheme ? "rgba(34,211,238,0.12)" : "rgba(168,85,247,0.12)";
  const joinButtonGradient = isMaleTheme
    ? ["rgb(41,120,242)", "rgb(51,194,242)"]
    : ["rgb(251,146,60)", "rgb(252,99,184)"];
  const runButtonGradient = isMaleTheme
    ? ["rgb(23,59,120)", "rgb(43,99,184)"]
    : ["rgb(79,148,255)", "rgb(89,89,250)"];
  const resultButtonGradient = isMaleTheme
    ? ["rgb(28,77,153)", "rgb(51,194,242)"]
    : ["rgb(140,79,245)", "rgb(252,99,184)"];
  const heroIconSymbol = isMaleTheme ? "🛡️" : "✨";
  const statIcon = isMaleTheme ? "⚡" : "✦";
  const content = getContent(selectedLanguage, joinedThisWeekMatching, hasMatchResult);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-5 sm:px-5 sm:py-6" style={pageBackgroundStyle(isMaleTheme)}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-0 top-0 rounded-full"
          style={orbStyle(backgroundOrbLeading, 280, 50, -140, -260)}
        />
        <div
          className="absolute right-0 top-0 rounded-full"
          style={orbStyle(backgroundOrbTrailing, 300, 60, 150, -180)}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[430px] sm:max-w-[768px]">
        <div className="pb-3 text-center text-[16px] font-semibold text-black/80 sm:text-[17px]">
          {content.navigationTitleText}
        </div>

        <div className="flex flex-col gap-5 sm:gap-6">
          <HeroSection
            isMaleTheme={isMaleTheme}
            heroGradient={heroGradient}
            heroGlowGradient={heroGlowGradient}
            heroBadgeText={content.heroBadgeText}
            heroTitleText={content.heroTitleText}
            introBodyText={content.introBodyText}
            heroIconSymbol={heroIconSymbol}
          />

          <InfoCard
            title={content.matchResultTitleText}
            systemImage="✦"
            primaryAccent={primaryAccent}
            softAccentFill={softAccentFill}
          >
            <div className="flex flex-col gap-4">
              {hasMatchResult ? (
                <div className="flex flex-col gap-[14px]">
                  <PremiumLabel text={content.reasonLabelText} softAccentFill={softAccentFill} />
                  <p className="text-base font-medium leading-7 text-black/80">{matchedReason}</p>
                  <PremiumLabel text={content.emailLabelText} softAccentFill={softAccentFill} />
                  <p className="text-base font-semibold" style={{ color: secondaryAccent }}>
                    {matchedEmail}
                  </p>
                  <PremiumButton
                    title={content.viewMatchResultButtonText}
                    gradient={resultButtonGradient}
                    href="/match"
                  />
                </div>
              ) : (
                <>
                  <p className="text-[17px] font-semibold leading-[1.7] text-black/52 sm:text-[18px]">
                    {content.noMatchResultText}
                  </p>
                  {joinedThisWeekMatching ? (
                    <PremiumButton
                      title={content.viewMatchResultButtonText}
                      gradient={resultButtonGradient}
                      href="/match"
                    />
                  ) : null}
                </>
              )}
            </div>
          </InfoCard>

          <InfoCard
            title={content.questionnaireTitleText}
            systemImage="📝"
            primaryAccent={primaryAccent}
            softAccentFill={softAccentFill}
          >
            <div className="flex flex-col gap-4">
              <p className="text-[17px] font-medium leading-[1.75] text-black/78 sm:text-[18px] sm:leading-[1.7]">
                {content.questionnaireBodyText}
              </p>
              <PremiumButton
                title={content.questionnaireButtonText}
                gradient={isMaleTheme ? ["rgb(28,44,96)", "rgb(69,111,203)"] : ["rgb(255,120,171)", "rgb(125,84,242)"]}
                href="/questionnaire"
              />
            </div>
          </InfoCard>

          <InfoCard
            title={content.daypetTitleText}
            systemImage="✨"
            primaryAccent={primaryAccent}
            softAccentFill={softAccentFill}
          >
            <div className="flex flex-col gap-4">
              <p className="text-base font-medium leading-7 text-black/75">
                {content.daypetBodyText}
              </p>
              <PremiumButton title={content.daypetButtonText} gradient={heroGradient} href="/daypet" />
            </div>
          </InfoCard>

          <InfoCard
            title={content.weeklyStatusTitleText}
            systemImage="🗓️"
            primaryAccent={primaryAccent}
            softAccentFill={softAccentFill}
          >
            <div className="flex flex-col gap-[14px]">
              <div className="flex items-start gap-3">
                <p className="flex-1 text-base font-medium text-black/80">
                  {joinedThisWeekMatching ? content.joinedStatusText : content.notJoinedStatusText}
                </p>
                <span
                  className="inline-flex rounded-full px-3 py-2 text-[12px] font-bold"
                  style={
                    joinedThisWeekMatching
                      ? { backgroundColor: "rgba(34,197,94,0.16)", color: "rgb(34,197,94)" }
                      : { backgroundColor: pillBackgroundColor, color: primaryAccent }
                  }
                >
                  {content.activeStatusPillText}
                </span>
              </div>
              {joinedThisWeekMatching ? null : (
                <PremiumButton
                  title={content.joinThisWeekButtonText}
                  gradient={joinButtonGradient}
                  href="/match"
                />
              )}
            </div>
          </InfoCard>

          <InfoCard
            title={content.runMatchingTitleText}
            systemImage="⚡"
            primaryAccent={primaryAccent}
            softAccentFill={softAccentFill}
          >
            <PremiumButton
              title={content.runMatchingButtonText}
              gradient={runButtonGradient}
              href="/match"
            />
          </InfoCard>

          <InfoCard
            title={content.statsTitleText}
            systemImage="📈"
            primaryAccent={primaryAccent}
            softAccentFill={softAccentFill}
          >
            <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-3">
              <CompactStatCard
                title={content.totalUsersLabelText}
                value={`${totalUsersInMatching}`}
                tint={isMaleTheme ? primaryAccent : "#FF78AB"}
                icon={statIcon}
              />
              <CompactStatCard
                title={content.lastWeekPairsLabelText}
                value={`${lastWeekMatchedPairs}`}
                tint={secondaryAccent}
                icon={statIcon}
              />
              <CompactStatCard
                title={content.currentWeekUsersLabelText}
                value={`${currentWeekUsersInMatching}`}
                tint={isMaleTheme ? "#63C7FF" : "#FD9E5C"}
                icon={statIcon}
              />
            </div>
          </InfoCard>

          <InfoCard
            title={content.quickEntryTitleText}
            systemImage="▦"
            primaryAccent={primaryAccent}
            softAccentFill={softAccentFill}
          >
            <div className="grid grid-cols-3 gap-[10px]">
              <HomeBottomButton
                title={content.aboutUsButtonText}
                icon="ℹ️"
                tint={isMaleTheme ? "#3882F5" : "#FC63B8"}
                href="/"
              />
              <HomeBottomButton
                title={content.portraitButtonText}
                icon="✨"
                tint={isMaleTheme ? "#33C2F2" : "#7D54F2"}
                href="/daypet"
              />
              <HomeBottomButton
                title={content.profileButtonText}
                icon="👤"
                tint={isMaleTheme ? "#173B78" : "#FF78AB"}
                href="/"
              />
            </div>
          </InfoCard>
        </div>
      </div>
    </main>
  );
}