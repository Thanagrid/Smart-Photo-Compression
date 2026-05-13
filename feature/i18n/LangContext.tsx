"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "th";

type Translations = Record<string, string>;

const en: Translations = {
  // Home Page
  "badge.processing": "Fast & Secure Local Processing",
  "home.title.smart": "Smart ",
  "home.title.compress": "Photo Compression",
  "home.desc": "Reduce the file size of your photos without losing quality. Choose from multiple compression levels and download your optimized images instantly.",
  "home.btn.png": "Compress PNG",
  "home.btn.jpg": "Compress JPG",
  "home.feat1.title": "Lightning Fast",
  "home.feat1.desc": "Processed directly in your browser. No server uploads required.",
  "home.feat2.title": "Customizable",
  "home.feat2.desc": "Use quick presets or fine-tune from 1% to 100% with a precision slider and real-time size estimates.",
  "home.feat3.title": "100% Private",
  "home.feat3.desc": "Your images never leave your device, ensuring complete privacy.",
  "home.footer.p1": "This is my small project to experiment with 100% AI-powered coding (Gemini, Claude).",
  "home.footer.p2": "It's a website for compressing PNG and JPG images, with more features planned for the future.",
  
  // Compress UI
  "compress.back": "Back to Home",
  "compress.title": "Compress ",
  "compress.desc": "Reduce the file size of your {fileType} images instantly, without losing quality.",
  "compress.file.label": "Image File",
  "compress.file.remove": "Remove",
  "compress.file.upload.click": "Click to upload",
  "compress.file.upload.drag": " or drag and drop",
  "compress.file.limit": "{fileType} only, maximum 10MB",
  
  "compress.method.label": "Compression Method",
  "compress.method.q.title": "Reduce Quality",
  "compress.method.q.desc": "Keeps original width & height. Best for standard compression.",
  "compress.method.d.title": "Reduce Dimensions",
  "compress.method.d.desc": "Keeps image sharp, but shrinks width & height.",
  "compress.method.b.title": "Smart Compress",
  "compress.method.b.desc": "Reduces both quality & size for maximum compression.",

  "compress.level.label": "Compression Level",
  "compress.level.est": "Est. Size:",
  "compress.level.high": "High (75%)",
  "compress.level.med": "Medium (50%)",
  "compress.level.low": "Low (25%)",
  "compress.level.small": "Small Size (1%)",
  "compress.level.quality": "High Quality (100%)",

  "compress.btn.compressing": "Compressing...",
  "compress.btn.compress": "Compress Image",
  "compress.btn.complete": "Compression complete!",
  "compress.btn.reduced": "Reduced from ",
  "compress.btn.to": " to ",
  "compress.btn.download": "Download {fileType}",
  "compress.btn.recompress": "Recompress",
  "compress.btn.startover": "Start Over",
  "compress.error.select": "Please select a {fileType} file.",
  "compress.error.failed": "Failed to compress image."
};

const th: Translations = {
  // Home Page
  "badge.processing": "ประมวลผลเร็วและปลอดภัยบนเครื่องของคุณ",
  "home.title.smart": "ระบบบีบอัดภาพ ",
  "home.title.compress": "อัจฉริยะ",
  "home.desc": "ลดขนาดไฟล์รูปภาพของคุณโดยไม่เสียคุณภาพ เลือกระดับการบีบอัดได้ตามต้องการ พร้อมดาวน์โหลดไฟล์ที่ปรับแต่งแล้วได้ทันที",
  "home.btn.png": "บีบอัดไฟล์ PNG",
  "home.btn.jpg": "บีบอัดไฟล์ JPG",
  "home.feat1.title": "รวดเร็วดุจสายฟ้า",
  "home.feat1.desc": "ประมวลผลผ่านเบราว์เซอร์ของคุณโดยตรง ไม่ต้องเสียเวลาอัปโหลดขึ้นเซิร์ฟเวอร์",
  "home.feat2.title": "ปรับแต่งได้ตามใจ",
  "home.feat2.desc": "เลือก Preset ล่วงหน้า หรือจะปรับละเอียดตั้งแต่ 1-100% ด้วย Slider พร้อมดูขนาดไฟล์โดยประมาณ (Est. Size) แบบ Real-time",
  "home.feat3.title": "เป็นส่วนตัว 100%",
  "home.feat3.desc": "รูปภาพของคุณจะไม่ถูกส่งออกจากเครื่อง มั่นใจได้ในความปลอดภัยสูงสุด",
  "home.footer.p1": "โปรเจ็กต์เล็กๆ นี้จัดทำขึ้นเพื่อทดลองการเขียนโค้ดด้วย AI แบบ 100% (Gemini, Claude)",
  "home.footer.p2": "เป็นเว็บไซต์สำหรับบีบอัดไฟล์รูปภาพ PNG และ JPG และจะมีฟีเจอร์อื่นๆ เพิ่มเติมในอนาคต",

  // Compress UI
  "compress.back": "กลับหน้าหลัก",
  "compress.title": "บีบอัดไฟล์ ",
  "compress.desc": "ลดขนาดไฟล์ {fileType} ของคุณอย่างรวดเร็ว โดยยังคงความคมชัดไว้",
  "compress.file.label": "ไฟล์รูปภาพ",
  "compress.file.remove": "ลบไฟล์",
  "compress.file.upload.click": "คลิกเพื่ออัปโหลด",
  "compress.file.upload.drag": " หรือลากไฟล์มาวางตรงนี้",
  "compress.file.limit": "รองรับเฉพาะ {fileType} ขนาดสูงสุด 10MB",
  
  "compress.method.label": "รูปแบบการบีบอัด",
  "compress.method.q.title": "ลด Quality",
  "compress.method.q.desc": "คงขนาดกว้างxยาวเดิมไว้ เหมาะสำหรับการบีบอัดมาตรฐาน",
  "compress.method.d.title": "ลดสัดส่วน (Dimensions)",
  "compress.method.d.desc": "ภาพคมชัดเหมือนเดิม แต่ขนาดกว้างxยาวจะเล็กลง",
  "compress.method.b.title": "Smart Compress",
  "compress.method.b.desc": "ลดทั้ง Quality และสัดส่วนภาพ เพื่อขนาดไฟล์ที่เล็กที่สุด",

  "compress.level.label": "ระดับการบีบอัด",
  "compress.level.est": "ขนาดประมาณ:",
  "compress.level.high": "สูง (75%)",
  "compress.level.med": "กลาง (50%)",
  "compress.level.low": "ต่ำ (25%)",
  "compress.level.small": "ไฟล์เล็ก (1%)",
  "compress.level.quality": "ภาพชัด (100%)",

  "compress.btn.compressing": "กำลังบีบอัด...",
  "compress.btn.compress": "บีบอัดรูปภาพ",
  "compress.btn.complete": "บีบอัดเสร็จสมบูรณ์!",
  "compress.btn.reduced": "ลดขนาดจาก ",
  "compress.btn.to": " เหลือ ",
  "compress.btn.download": "ดาวน์โหลด {fileType}",
  "compress.btn.recompress": "บีบอัดอีกรอบ",
  "compress.btn.startover": "เริ่มใหม่",
  "compress.error.select": "กรุณาเลือกไฟล์ {fileType}",
  "compress.error.failed": "เกิดข้อผิดพลาดในการบีบอัด"
};

const dictionaries = { en, th };

interface LangContextProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string, variables?: Record<string, string>) => string;
}

const LangContext = createContext<LangContextProps | undefined>(undefined);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const t = (key: string, variables?: Record<string, string>): string => {
    let text = dictionaries[lang][key] || dictionaries["en"][key] || key;
    if (variables) {
      Object.keys(variables).forEach((varKey) => {
        text = text.replace(new RegExp(`{${varKey}}`, "g"), variables[varKey]);
      });
    }
    return text;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error("useLang must be used within a LangProvider");
  }
  return context;
}
