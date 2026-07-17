import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const baseUrl = import.meta.env.BASE_URL;

const theme = createTheme({
  typography: {
    fontFamily: "'Shippori Mincho', 'Prompt', sans-serif",
  },
});

const sparklerItems = [
  {
    id: 1,
    name: "กล่องไม้ไขลาน",
    nameCha: "Shoji",
    type: "SR",
    desc: `เมื่อปลายไฟเย็นถูกจุดขึ้น เสียงเพลงราวกล่องดนตรีจะค่อยบรรเลงคลอไปในบรรยากาศ\n\nมันอาจจะเป็นทำนองที่ไม่เคยคุ้น.. หรืออาจจะเป็นเพลงที่คุณเคยได้ยินมาก่อนสักครั้งหนึ่ง\n\nโอ๊ะ ดูเหมือนว่าถ้าสะบัดไปมามันจะเปลี่ยนจังหวะได้ด้วยนะ ? \nลองเล่นเป็นวาทยากรสักครั้งไหม`,
    quote: "",
    image: `${baseUrl}images/CB/Shoji.webp`,
    rate: 5.45,
  },
  {
    id: 2,
    name: "กล่องไม้ไขลาน",
    nameCha: "Shoji",
    type: "SSR",
    desc: `เมื่อปลายไฟเย็นถูกจุดขึ้น เสียงเพลงราวกล่องดนตรีจะค่อยบรรเลงคลอไปในบรรยากาศ\nมันอาจจะเป็นทำนองที่ไม่เคยคุ้น.. หรืออาจจะเป็นเพลงที่คุณเคยได้ยินมาก่อนสักครั้งหนึ่ง\n\nโอ๊ะ ดูเหมือนว่าถ้าสะบัดไปมามันจะเปลี่ยนจังหวะได้ด้วยนะ ?\nลองเล่นเป็นวาทยากรสักครั้งไหม`,
    quote: `[ อันนี้ของคุณครับ ]\n[ ขอให้สนุกกับงานนะครับ ]`,
    image: `${baseUrl}images/NM/Shoji.webp`,
    rate: 3.64,
    themeColor: "#096CFF",
    themeGrad: "#87CEFA",
    bgPositionDesktop: "right 15%",
    xAnimate: "20%",
  },
  {
    id: 3,
    name: "กรุ่นกลิ่นบุปผา",
    nameCha: "Jun",
    type: "SR",
    desc: `เมื่อปลายสุดของแท่งไม้ถูกจุด กลับพบดอกไม้บานออกมา บุปผาแก้วสีสวยอันบอบบาง คุณทำได้เพียงมองมันผลิดอก ก่อนจะค่อยร่วงโรยลงอย่างช้า ๆ ทีละกลีบ ทีละกลีบ...\n\nกลิ่นไม้หอมคละคลุ้งอยู่ทั่ว ชวนผ่อนคลายหลับตาฝันถึงเรื่องราวที่ผ่านมา หรืออนาคตที่ไม่อาจจินตนาการได้\n\nยามกลีบสุดท้ายร่วงหล่น กลิ่นหอมนั้นก็จางหายไป เหลือไว้เพียงเศษกิ่งไม้ธรรมดา ๆ อันนึง\n\nช่างเป็นช่วงเวลาที่แสนสั้น...`,
    quote: "",
    image: `${baseUrl}images/CB/Jun.webp`,
    rate: 5.45,
  },
  {
    id: 4,
    name: "กรุ่นกลิ่นบุปผา",
    nameCha: "Jun",
    type: "SSR",
    desc: `เมื่อปลายสุดของแท่งไม้ถูกจุด กลับพบดอกไม้บานออกมา บุปผาแก้วสีสวยอันบอบบาง คุณทำได้เพียงมองมันผลิดอก ก่อนจะค่อยร่วงโรยลงอย่างช้า ๆ ทีละกลีบ ทีละกลีบ...\n\nกลิ่นไม้หอมคละคลุ้งอยู่ทั่ว ชวนผ่อนคลายหลับตาฝันถึงเรื่องราวที่ผ่านมา หรืออนาคตที่ไม่อาจจินตนาการได้\n\nยามกลีบสุดท้ายร่วงหล่น กลิ่นหอมนั้นก็จางหายไป เหลือไว้เพียงเศษกิ่งไม้ธรรมดา ๆ อันนึง\n\nช่างเป็นช่วงเวลาที่แสนสั้น...`,
    quote: `“ขอบคุณที่แวะเวียนมานะครับ”\n“ขอให้เป็นช่วงเวลาที่ดี..”`,
    image: `${baseUrl}images/NM/Jun.webp`,
    rate: 3.64,
    themeColor: "#C3CFFF",
    themeGrad: "#E9ECFF",
    bgPositionDesktop: "right 15%",
  },
  {
    id: 5,
    name: "ประกายเร้นเงา",
    nameCha: "Kyora",
    type: "SR",
    desc: `เมื่อจุดไฟ...\nประกายสีเงินอมม่วงสลัวจะหยาดหยดลงเป็น "ฝูงปลาเงา" แหวกว่ายอยู่รอบกาย\nคอยดูดซับความเหนื่อยล้าและขุ่นมัวในจิตใจ\n\nจนเมื่อแสงไฟมอดดับ...\nพวกมันก็จะสลายไป พร้อมนำพาทุกความรู้สึกแย่ ๆ ให้จางหายไปในความมืด\n\nลองหยุดพัก...\n ให้ฝูงปลาพวกนี้ช่วยเยียวยาจิตใจคุณดูสักหน่อยไหม?`,
    quote: "",
    image: `${baseUrl}images/CB/Kyora.webp`,
    rate: 5.45,
  },
  {
    id: 6,
    name: "ประกายเร้นเงา",
    nameCha: "Kyora",
    type: "SSR",
    desc: `เมื่อจุดไฟ... ประกายสีเงินอมม่วงสลัวจะหยดลงเป็น "ฝูงปลาเงา" แหวกว่ายคอยดูดซับความเหนื่อยล้าในจิตใจ\nจนเมื่อแสงไฟมอดดับ... พวกมันก็จะสลายไป พร้อมนำพาทุกความรู้สึกแย่ๆ ให้จางหายไปในความมืด\n\nลองหยุดพัก...\nให้ฝูงปลาพวกนี้ช่วยเยียวยาจิตใจคุณดูสักหน่อยไหม?`,
    quote: `"..ไม่ได้วิเศษอะไรขนาดนั้นหรอกครับ รีบ ๆ รับไปเถอะ"\n\n"รับไปแล้วกรุณาอย่าเล่นแถวหน้าร้านนะครับ มันเกะ—"\n"หมายถึง มันอันตรายน่ะครับ"`,
    image: `${baseUrl}images/NM/Kyora.webp`,
    rate: 3.64,
    themeColor: "#FFA2B7",
    themeGrad: "#000000",
    bgPositionDesktop: "right 5%",
  },
  {
    id: 7,
    name: "สลักคำขอ",
    nameCha: "Tsuru",
    type: "SR",
    desc: `ละอองแสงสีทองสว่างเป็นประกายแวววาวเมื่อถูกจุดขึ้น นอกจากนั้นก็ดูไม่ต่างจากไฟเย็นธรรมดาทั่วไป\n\nจนกระทั่งคุณลองแกว่งมันดู\n ก็จะปรากฏเป็นเจ้านกกระดาษล่องลอยล้อมรอบคุณ\nโผล่เพิ่มขึ้นมาเรื่อยๆไม่สิ้นสุดตามจำนวนที่คุณสะบัด\n\nก่อนที่จะดับลง เหล่านกกระดาษไม่ว่าจะมากน้อยได้รวมตัวกัน กลายเป็นเพียงแสงเทียนริบหรี่อยู่ปลายด้าม\n\nอยากลองอธิษฐานแล้วเป่ามันดูไหม ?`,
    quote: "",
    image: `${baseUrl}images/CB/Tsuru.webp`,
    rate: 5.45,
  },
  {
    id: 8,
    name: "สลักคำขอ",
    nameCha: "Tsuru",
    type: "SSR",
    desc: `ละอองแสงสีทองสว่างเป็นประกายแวววาวเมื่อถูกจุดขึ้น นอกจากนั้นก็ดูไม่ต่างจากไฟเย็นธรรมดาทั่วไป\n\nจนกระทั่งคุณลองแกว่งมันดู\n ก็จะปรากฏเป็นเจ้านกกระดาษล่องลอยล้อมรอบคุณ โผล่เพิ่มขึ้นมาเรื่อยๆไม่สิ้นสุดตามจำนวนที่คุณสะบัด\n\nก่อนที่จะดับลง เหล่านกกระดาษไม่ว่าจะมากน้อยได้รวมตัวกัน กลายเป็นเพียงแสงเทียนริบหรี่อยู่ปลายด้าม\n\nอยากลองอธิษฐานแล้วเป่ามันดูไหม ?`,
    quote: (
      <>
        “<b>เฮ้ย</b> เอาไปสิ”
        <br />
        “แล้วถ้าเล่นจนเสร็จ อย่าลืมดับมันด้วยล่ะ”
      </>
    ),
    image: `${baseUrl}images/NM/Tsuru2.webp`,
    rate: 3.64,
    themeColor: "#C9EE66",
    themeGrad: "#E6C969",
    bgPositionDesktop: "right 10%",
  },

  {
    id: 9,
    name: "พู่กันสีดำ",
    nameCha: "Yoru",
    type: "SR",
    desc: `เมื่อเริ่มจุดไฟ\nแสงนั้นเป็นสีดำแตกออกเป็นประกาย แม้สีจะดำทึบ\nแต่มันก็ส่องสว่างในความมืดได้อย่างน่าประหลาด\n\nหากคุณเริ่มแกว่งหรือวาดมันในอากาศ\nแสงนั้นจะยังคงรูปร่างตามที่คุณวาดไว้ไม่หายไปในทันทีจนกว่าแสงไฟบนก้านจะดับลง\n\nอยากลองวาดอะไรดูหน่อยไหม?`,
    quote: "",
    image: `${baseUrl}images/CB/Yoru.webp`,
    rate: 5.45,
  },
  {
    id: 10,
    name: "พู่กันสีดำ",
    nameCha: "Yoru",
    type: "SSR",
    desc: `เมื่อเริ่มจุดไฟ\nแสงนั้นเป็นสีดำแตกออกเป็นประกาย แม้สีจะดำทึบ แต่มันก็ส่องสว่างในความมืดได้อย่างน่าประหลาด\n\nหากคุณเริ่มแกว่งหรือวาดมันในอากาศ\nแสงนั้นจะยังคงรูปร่างตามที่คุณวาดไว้ไม่หายไปในทันทีจนกว่าแสงไฟบนก้านจะดับลง\n\nอยากลองวาดอะไรดูหน่อยไหม?`,
    quote: `“ฉันให้นี่?”\n“ไฟเย็นไงล่ะ เทศกาลแบบนี้ก็ต้องเล่นไฟเย็นใช่มั้ยล่ะ!”\n“สนุกแน่นอนฉันรับรอง”`,
    image: `${baseUrl}images/NM/Yoru.webp`,
    rate: 3.64,
    themeColor: "#494949",
    themeGrad: "#0B0F0F",
    xInitial: "10%",
    xAnimate: "20%",
  },
  {
    id: 11,
    name: "ปะการังแสง",
    nameCha: "Madoka",
    type: "SR",
    desc: `แท่งไฟสีขาวเหลือบมุก\nปลายด้านหนึ่งมีสองแฉก อีกด้านมีแฉกเดียว\n\nหากเลือกจุดด้านที่มีปลายสองแฉก\nเมื่อเกิดการเผาไหม้จนถึงจุดตัดตรงกลางแท่ง คุณจะได้ยินเสียงของคนที่คุณรักและคิดถึงที่สุดในปัจจุบัน\nเสียงนั้นจะเอ่ยชื่อคุณขึ้นมาเบาๆ ก่อนจะจางหายไปในทันที\n\nหากเลือกจุดด้านที่มีแฉกเดียว\nคุณจะได้ยินเสียงของตัวเองในอดีตแทน เสียงนั้นจะคงอยู่ข้างกายคุณจนกว่าประกายไฟจะมอดดับไป`,
    quote: "",
    image: `${baseUrl}images/CB/Madoka.webp`,
    rate: 5.45,
  },
  {
    id: 12,
    name: "ปะการังแสง",
    nameCha: "Madoka",
    type: "SSR",
    desc: `แท่งไฟสีขาวเหลือบมุก ปลายด้านหนึ่งมีสองแฉก อีกด้านมีแฉกเดียว\n\nหากเลือกจุดด้านที่มีปลายสองแฉก\nเมื่อเกิดการเผาไหม้จนถึงจุดตัดตรงกลางแท่ง คุณจะได้ยินเสียงของคนที่คุณรักและคิดถึงที่สุดในปัจจุบัน\nเสียงนั้นจะเอ่ยชื่อคุณขึ้นมาเบาๆ ก่อนจะจางหายไปในทันที\n\nหากเลือกจุดด้านที่มีแฉกเดียว\nคุณจะได้ยินเสียงของตัวเองในอดีตแทน เสียงนั้นจะคงอยู่ข้างกายคุณจนกว่าประกายไฟจะมอดดับไป`,
    quote: `[อัuนี้ .. ให้ค่:]\n[ขoให้สนุnกัuงาuเnศกาลนะ]\n[ควรจ:จุดด้าuไหuดี..เหรo?]\n[ฉัuเองก็ไม่รู้เหมืoนกัน ลoงเลือกตามที่ใจคุณบอกดู ก็น่าจะดีนะ ..]`,
    image: `${baseUrl}images/NM/Madoka.webp`,
    rate: 3.64,
    themeColor: "#D9E8F2",
    themeGrad: "#D9E8F2",
    bgPositionDesktop: "right 20%",
    xInitial: "13%",
    xAnimate: "23%",
  },
  {
    id: 13,
    name: "แสงประกายฟ้า",
    nameCha: "Shinso",
    type: "SR",
    desc: `แท่งไฟเย็นธรรมดาที่จะมีเศษผลึกสีน้ำเงินประกอบอยู่ภายในประปราย\nและเมื่อทำการเริ่มจุดไฟ ประกายแสงสีฟ้าใสจะส่องสว่างออกมาราวกับช่วงเวลาของท้องฟ้า\n\nแสงสว่างนั้นทอประกายเรื่อย ๆ จนใกล่ถึงส่วนปลายของแท่งไฟ แม้ว่าจะเพียงเวลาสั้น ๆ \nแต่สนใจลองมองท้องฟ้าไปพร้อมกับแท่งไฟเย็นหรือเปล่าละ ?`,
    quote: "",
    image: `${baseUrl}images/CB/Shinso.webp`,
    rate: 5.45,
  },
  {
    id: 14,
    name: "แสงประกายฟ้า",
    nameCha: "Shinso",
    type: "SSR",
    desc: `แท่งไฟเย็นธรรมดาที่จะมีเศษผลึกสีน้ำเงินประกอบอยู่ภายในประปราย\nและเมื่อทำการเริ่มจุดไฟ ประกายแสงสีฟ้าใสจะส่องสว่างออกมาราวกับช่วงเวลาของท้องฟ้า\n\nแสงสว่างนั้นทอประกายเรื่อย ๆ จนใกล่ถึงส่วนปลายของแท่งไฟ แม้ว่าจะเพียงเวลาสั้น ๆ \nแต่สนใจลองมองท้องฟ้าไปพร้อมกับแท่งไฟเย็นหรือเปล่าละ ?`,
    quote: `“ ไฟเย็นหรอ ? ”\n“ ครั้งแรกเลยละที่ได้ลองเล่น ”\n\n“ ช่วยถือแท่งไฟเล่นไปกับฉันหน่อยนะ.. ”`,
    image: `${baseUrl}images/NM/Shinso.webp`,
    rate: 3.64,
    themeColor: "#0016FF",
    themeGrad: "#0016FF",
    bgPositionDesktop: "right 10%",
    xInitial: "20%",
    xAnimate: "30%",
  },
  {
    id: 15,
    name: "ไฟเย็นสุดมหัศจรรย์ของฮิบิกิผู้ยิ่งใหญ่",
    nameCha: "Hibiki",
    type: "SR",
    desc: `เมื่อไฟถูกจุดขึ้น ประกายไฟสีเหลืองทองส่องแสงสว่างวาบ เสียงตึกตัก ตึกตักของหัวใจของคุณค่อย ๆ ดังขึ้นจนกลบเสียงรอบข้างของคุณ\n\nไม่มีเสียงอะไรนอกจากเสียงหัวใจของคุณที่ยังคงเต้นอยู่\nแต่ความสงบนี้อยู่ได้ไม่นานหรอก\n...\nทันทีที่ไฟกำลังจะมอดดับ ประกายไฟสุดท้ายของมันจะระเบิดออกมาเป็นพลุขนาดย่อยส่องแสงสวยงาม\n(ระวังอย่าให้ระเบิดใส่หน้าล่ะ !!!)`,
    quote: "",
    image: `${baseUrl}images/CB/Hibiki.webp`,
    rate: 5.45,
  },
  {
    id: 16,
    name: "ไฟเย็นสุดมหัศจรรย์ของฮิบิกิผู้ยิ่งใหญ่",
    nameCha: "Hibiki",
    type: "SSR",
    desc: `เมื่อไฟถูกจุดขึ้น ประกายไฟสีเหลืองทองส่องแสงสว่างวาบ เสียงตึกตัก ตึกตักของหัวใจของคุณค่อย ๆ ดังขึ้นจนกลบเสียงรอบข้างของคุณ\n\nไม่มีเสียงอะไรนอกจากเสียงหัวใจของคุณที่ยังคงเต้นอยู่\nแต่ความสงบนี้อยู่ได้ไม่นานหรอก\n...\nทันทีที่ไฟกำลังจะมอดดับ ประกายไฟสุดท้ายของมันจะระเบิดออกมาเป็นพลุขนาดย่อยส่องแสงสวยงาม\n(ระวังอย่าให้ระเบิดใส่หน้าล่ะ !!!)`,
    quote: `“มันส่องประกายเหมือนดาวตกเลยเนอะ เพราะงั้นลองรับไปแล้วอธิษฐานดูไหม”\n“เร็ว ๆ สิเดี๋ยวจะดับเอานา”\n“ขออะไรไปบอกด้วยได้ไหม ฮิบิกิอยากรู้ด้วย!”`,
    image: `${baseUrl}images/NM/Hibiki.webp`,
    rate: 3.64,
    themeColor: "#922F1D",
    themeGrad: "#922F1D",
    bgPositionDesktop: "60% 8%",
    xAnimate: "9%",
  },
  {
    id: 17,
    name: "เศษฝันสีทับทิม",
    nameCha: "Zeirina",
    type: "SR",
    desc: `เมื่อปลายไฟเย็นถูกจุดมวลมายาจะปรากฎขึ้น อาจเป็นสิ่งที่คุณนึกถึงชั่วขณะ ถวิลหา ไม่ว่าจะเป็นความทรงจำ สิ่งของ หรือใครสักคน แต่สิ่งที่ปรากฏ จะเป็นเพียงเศษเสี้ยวเล็ก ๆ ที่มากพอให้คุณนึกถึงเรื่องราวพวกนั้นเท่านั้น\n\nคิดถึงหรือเปล่า ?\nอย่างน้อย มันก็คงอยู่เป็นเพื่อนคุณ ..จนกว่าประกายแสงสีทับทิมนั้น จะมอดดับลง`,
    quote: "",
    image: `${baseUrl}images/CB/Zeirina.webp`,
    rate: 5.45,
  },
  {
    id: 18,
    name: "เศษฝันสีทับทิม",
    nameCha: "Zeirina",
    type: "SSR",
    desc: `เมื่อปลายไฟเย็นถูกจุดมวลมายาจะปรากฎขึ้น อาจเป็นสิ่งที่คุณนึกถึงชั่วขณะ ถวิลหา ไม่ว่าจะเป็นความทรงจำ สิ่งของ\nหรือ ใครสักคน แต่สิ่งที่ปรากฏ จะเป็นเพียงเศษเสี้ยวเล็ก ๆ ที่มากพอให้คุณนึกถึงเรื่องราวพวกนั้นเท่านั้น\n\nคิดถึงหรือเปล่า ?\n\nอย่างน้อย มันก็คงอยู่เป็นเพื่อนคุณ ..จนกว่าประกายแสงสีทับทิมนั้น จะมอดดับลง`,
    quote: (
      <>
        “<b>ชอบนะ</b>”
        <br />
        “หมายถึงไฟเย็นน่ะ”
        <br />
        <br />
        “www อะไรกัน อยากได้เหรอคะ?”
        <br />
        “รับไปสิ— เธอจะเห็นอะไรกันนะ? อยากรู้จัง♡”
      </>
    ),
    image: `${baseUrl}images/NM/Zeirina.webp`,
    rate: 3.6,
    themeColor: "#670626",
    themeGrad: "#000000",
    bgPositionDesktop: "right 25%",
    xInitial: "15%",
    xAnimate: "25%",
  },
  {
    id: 19,
    name: "ไฟเย็นธรรมดา ๆ ครับ.",
    nameCha: "Tenshijo",
    type: "SR",
    desc: `เมื่อไฟถูกจุดขึ้น... มันกลับเป็นเพียงเปลวไฟธรรมดาที่ไม่ได้มีอะไรพิเศษ\n\nเวลาผ่านไปครู่หนึ่ง สายลมอ่อน ๆ ค่อย ๆ พัดออกมาจากไฟเย็น ค่อย ๆ คลายความร้อนรอบๆตัวคุณ\n\nหวังว่าในระหว่างที่กำลังอธิษฐานสายลมนี้จะช่วยคลายร้อนให้คุณได้บ้างในหน้าร้อนนะ`,
    quote: "",
    image: `${baseUrl}images/CB/Tenshijo.webp`,
    rate: 5.5,
  },
  {
    id: 20,
    name: "ไฟเย็นธรรมดา ๆ ครับ.",
    nameCha: "Tenshijo",
    type: "SSR",
    desc: `เมื่อไฟถูกจุดขึ้น... มันกลับเป็นเพียงเปลวไฟธรรมดาที่ไม่ได้มีอะไรพิเศษ\n\nเวลาผ่านไปครู่หนึ่ง สายลมอ่อน ๆ ค่อย ๆ พัดออกมาจากไฟเย็น ค่อย ๆ คลายความร้อนรอบๆตัวคุณ\n\nหวังว่าในระหว่างที่กำลังอธิษฐานสายลมนี้จะช่วยคลายร้อนให้คุณได้บ้างในหน้าร้อนนะ`,
    quote: `“เอาไปซ-ครับ...”\n“เร็ว เอาไป”\n\n“ของแบบนี้ไร้สาระชะมัด”\n“นี่... ชอบของแบบนี้จริง ๆ หรอ...”`,
    image: `${baseUrl}images/NM/Tenshijo.webp`,
    rate: 3.64,
    themeColor: "#4C9085",
    themeGrad: "#4C9085",
    bgPositionDesktop: "right 10%",
    xInitial: "27%",
    xAnimate: "37%",
  },
  {
    id: 21,
    name: "ไอรักฤดูร้อน (😍)",
    nameCha: "Tengen",
    type: "SR",
    desc: `ประกายสีฟ้าสว่างขึ้นเมื่อถูกจุดไฟ มันส่องแสงพร่างพราวราวเกล็ดหิมะ ค่อย ๆ เรียงตัวกันอย่างสวยงาม \n\nจนกลายเป็น... \nใบหน้าของ คามิโซโนะ เท็นเง็น (?)\nแบบคมชัด 3 มิติขนาดเท่าจริง\n\nคุณรู้สึกได้ถึงละอองเย็น ๆ ที่โปรยลงมาสัมผัสผิวผะแผ่ว\nแม้จะเป็นดอกไม้ไฟที่ประหลาดสักหน่อย\nแต่อย่างน้อยก็ช่วยดับร้อนให้ได้บ้างล่ะนะ`,
    quote: "",
    image: `${baseUrl}images/CB/Tengen.webp`,
    rate: 5.45,
  },
  {
    id: 22,
    name: "ไอรักฤดูร้อน (😍)",
    nameCha: "Tengen",
    type: "SSR",
    desc: `ประกายสีฟ้าสว่างขึ้นเมื่อถูกจุดไฟ มันส่องแสงพร่างพราวราวเกล็ดหิมะ ค่อย ๆ เรียงตัวกันอย่างสวยงาม\n\nจนกลายเป็น... \nใบหน้าของ คามิโซโนะ เท็นเง็น (?) แบบคมชัด 3 มิติขนาดเท่าจริง\n\nคุณรู้สึกได้ถึงละอองเย็น ๆ ที่โปรยลงมาสัมผัสผิวผะแผ่ว\nแม้จะเป็นดอกไม้ไฟที่ประหลาดสักหน่อย แต่อย่างน้อยก็ช่วยดับร้อนให้ได้บ้างล่ะนะ`,
    quote: (
      <>
        “เอ้า รับไฟ <b>‘เย็น’</b> นี่ไปสิ ความ cool
        ของฉันจะช่วยคลายร้อนให้เธอเอง”
        <br />
        .ขยิบตา .เสยผม
      </>
    ),
    image: `${baseUrl}images/NM/Tengen.webp`,
    rate: 3.64,
    themeColor: "#DDFFFF",
    themeGrad: "#e7fefe",

    bgPositionDesktop: "right 10%",
    xInitial: "30%",
    xAnimate: "40%",
  },
];
const sparklerList = [
  {
    id: 1,
    name: "เศษฝันสีทับทิม",
    imageNo: `${baseUrl}images/OFF/Zeirina.webp`,
    image: `${baseUrl}images/ON/Zeirina.webp`,
  },
  {
    id: 2,
    name: "กล่องไม้ไขลาน",
    imageNo: `${baseUrl}images/OFF/Shoji.webp`,
    image: `${baseUrl}images/ON/Shoji.webp`,
  },
  {
    id: 3,
    name: "แสงประกายฟ้า",
    imageNo: `${baseUrl}images/OFF/Shinso.webp`,
    image: `${baseUrl}images/ON/Shinso.webp`,
  },
  {
    id: 4,
    name: "พู่กันสีดำ",
    imageNo: `${baseUrl}images/OFF/Yoru.webp`,
    image: `${baseUrl}images/ON/Yoru.webp`,
  },
  {
    id: 5,
    name: "ประกายเร้นเงา",
    imageNo: `${baseUrl}images/OFF/Kyora.webp`,
    image: `${baseUrl}images/ON/Kyora.webp`,
  },
  {
    id: 6,
    name: "สลักคำขอ",
    imageNo: `${baseUrl}images/OFF/Tsuru.webp`,
    image: `${baseUrl}images/ON/Tsuru.webp`,
  },
  {
    id: 7,
    name: "ปะการังแสง",
    imageNo: `${baseUrl}images/OFF/Madoka1.webp`,
    image: `${baseUrl}images/ON/Madoka1.webp`,
  },
  {
    id: 8,
    name: "ปะการังแสง",
    imageNo: `${baseUrl}images/OFF/Madoka2.webp`,
    image: `${baseUrl}images/ON/Madoka2.webp`,
  },
  {
    id: 9,
    name: "กรุ่นกลิ่นบุปผา",
    imageNo: `${baseUrl}images/OFF/Jun.webp`,
    image: `${baseUrl}images/ON/Jun.webp`,
  },
  {
    id: 10,
    name: "ไอรักฤดูร้อน (😍)",
    imageNo: `${baseUrl}images/OFF/Tengen.webp`,
    image: `${baseUrl}images/ON/Tengen.webp`,
  },
  {
    id: 11,
    name: "ไฟเย็นของฮิบิกิ",
    imageNo: `${baseUrl}images/OFF/Hibiki.webp`,
    image: `${baseUrl}images/ON/Hibiki.webp`,
  },
  {
    id: 12,
    name: "ไฟเย็นธรรมดา ๆ ครับ.",
    imageNo: `${baseUrl}images/OFF/Tenshijo.webp`,
    image: `${baseUrl}images/ON/Tenshijo.webp`,
  },
];

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState(null);
  const [showFireworks, setShowFireworks] = useState(false);

  const [openCollection, setOpenCollection] = useState(false);
  const [collectedIds, setCollectedIds] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("yohana_gacha_collection");
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
      }
      return [];
    } catch (error) {
      console.warn("ไม่สามารถอ่าน LocalStorage ได้:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        "yohana_gacha_collection",
        JSON.stringify(collectedIds),
      );
    } catch (error) {
      console.warn("ไม่สามารถบันทึก LocalStorage ได้:", error);
    }
  }, [collectedIds]);

  const audioRef = useRef(null);
  const lastPulledIdRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const canHover = useMediaQuery("(hover: hover)");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // 🌟 [ส่วนที่แก้บัคที่ 1] สร้าง Particle พื้นหลังให้สุ่มแค่ครั้งเดียว ไม่กระตุกตอน Render ใหม่
  const bgParticles = useMemo(() => {
    return [...Array(35)].map((_, i) => ({
      id: i,
      isPink: i % 2 === 0,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 4 + 4,
      delay: Math.random() * 8,
      top: `${Math.random() * 100}vh`,
      left: `${Math.random() * 100}vw`,
    }));
  }, []);

  // 🌟 [ส่วนที่แก้บัคที่ 2] จำค่า Effect พลุตอนสุ่ม SSR
  const fireworkGeometry = useMemo(() => {
    return [...Array(80)].map(() => ({
      size: Math.random() * 8 + 3,
      angle: Math.random() * Math.PI * 2,
      distance: Math.random() * 70 + 30,
      duration: Math.random() * 1.5 + 0.5,
    }));
  }, []);

  // 🌟 [ส่วนที่แก้บัคที่ 3] จำค่า Effect ประกายไฟตอนหมุนกาชา
  const rollingSparks = useMemo(() => {
    return [...Array(40)].map((_, i) => ({
      angle: (i * 9 * Math.PI) / 180,
      distance: Math.random() * 70 + 40,
      duration: Math.random() * 0.8 + 0.4,
      delay: Math.random() * 1,
      size: Math.random() * 4 + 2,
      colorType: i % 3 === 0 ? "#FF69B4" : i % 2 === 0 ? "#FFB7C5" : "#FFF",
    }));
  }, []);

  // 🌟 [ส่วนที่แก้บัคที่ 4] จำค่า Effect อนุภาคหลังการ์ด SSR
  const ssrFloatParticles = useMemo(() => {
    return [...Array(30)].map((_, i) => ({
      size: Math.random() * 5 + 2,
      startX: `${Math.random() * 100}%`,
      driftX: (Math.random() - 0.5) * 60,
      duration: Math.random() * 5 + 4,
      delay: Math.random() * 5,
      isEven: i % 2 === 0,
    }));
  }, []);

  useEffect(() => {
    audioRef.current = new Audio(`${baseUrl}song/music.mp3`);
    audioRef.current.preload = "auto";
    const playAudioOnFirstInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.loop = true;
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log("Autoplay prevented:", err));
      }
      document.removeEventListener("click", playAudioOnFirstInteraction);
    };
    document.addEventListener("click", playAudioOnFirstInteraction, {
      once: true,
    });
    return () => {
      document.removeEventListener("click", playAudioOnFirstInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeAttribute("src");
        audioRef.current.load();
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.loop = true;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error("Audio error:", err);
          setIsPlaying(false);
        });
    }
  };

  const handleRollGacha = () => {
    setIsFlipped(false);
    setIsRolling(true);
    setOpenModal(true);
    setResult(null);
    setShowFireworks(false);

    setTimeout(() => {
      let pulledItem = sparklerItems[0];
      let isDuplicate = true;
      let maxRetries = 5;

      const totalWeight = sparklerItems.reduce(
        (sum, item) => sum + Math.round(item.rate * 100),
        0,
      );

      while (isDuplicate && maxRetries > 0) {
        const rand = Math.floor(Math.random() * totalWeight) + 1;
        let cumulativeWeight = 0;
        let foundItem = sparklerItems[sparklerItems.length - 1];

        for (let item of sparklerItems) {
          const itemWeight = Math.round(item.rate * 100);
          cumulativeWeight += itemWeight;
          if (rand <= cumulativeWeight) {
            foundItem = item;
            break;
          }
        }
        pulledItem = foundItem;
        if (lastPulledIdRef.current !== pulledItem.id) isDuplicate = false;
        maxRetries--;
      }

      lastPulledIdRef.current = pulledItem.id;
      setResult(pulledItem);
      setIsRolling(false);

      setCollectedIds((prev) => {
        if (!prev.includes(pulledItem.id)) return [...prev, pulledItem.id];
        return prev;
      });

      if (pulledItem.type === "SSR") {
        setShowFireworks(true);
        setTimeout(() => setShowFireworks(false), 5000);
      }
    }, 1500);
  };

  useEffect(() => {
    // โหลดรูปสุ่ม
    sparklerItems.forEach((item) => {
      const img = new Image();
      img.src = item.image;
    });
    // โหลดรูปโชว์หน้าแรก
    sparklerList.forEach((item) => {
      if (item.imageNo) {
        const img = new Image();
        img.src = item.imageNo;
      }
    });
  }, []);

  const isSR = result?.type === "SR";
  const cardBorderGradient = isSR
    ? "linear-gradient(135deg, #A3A3A3, #FFFFFF, #E0E0E0, #6B6B6B)"
    : "linear-gradient(135deg, #555555, #888888, #777777, #444444)";

  const cardGlow = isSR
    ? "0 0 25px rgba(255, 255, 255, 0.35)"
    : "0 0 10px rgba(0, 0, 0, 0.3)";
  const tagBg = isSR ? "rgba(240, 240, 240, 0.2)" : "rgba(120, 120, 120, 0.15)";
  const tagBorder = isSR
    ? "rgba(220, 220, 220, 0.8)"
    : "rgba(150, 150, 150, 0.4)";
  const tagGlow = isSR
    ? "0 0 8px rgba(255, 255, 255, 0.5)"
    : "0 0 0px transparent";
  const nameShadow = isSR
    ? "1px 1px 3px rgba(0, 0, 0, 0.8), 0 0 8px #FFFFFF"
    : "1px 1px 3px rgba(0, 0, 0, 0.8), 0 0 5px #888888";
  const btnColor = isSR ? "#E0E0E0" : "#888888";

  useEffect(() => {
    if (openModal || openCollection) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = ""; // ใช้ค่าว่างดีกว่า "auto" เพื่อคืนค่ากลับสู่ปกติ
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [openModal, openCollection]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          height: "100dvh",
          width: "100%",
          bgcolor: "#05020A",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflowX: "hidden",
          overflowY: "auto",
          boxSizing: "border-box",
        }}
      >
        {/* ใช้ตัวแปร bgParticles ที่เรา Memo ไว้ เพื่อลดอาการกระตุก */}
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundImage:
              "radial-gradient(circle at 50% 30%, #1A0B2E 0%, #05020A 70%)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          {bgParticles.map((p) => {
            const particleColor = p.isPink ? "#FFB7C5" : "#FFFFFF"; // เพิ่มตัวแปรสีตรงนี้
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0.4, 1, 0.2, 0],
                  scale: [0, 1.2, 0.8, 1.5, 0.5, 0],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: "easeInOut",
                  times: [0, 0.1, 0.3, 0.6, 0.8, 1],
                }}
                style={{
                  position: "absolute",
                  top: p.top,
                  left: p.left,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: "#FFF",
                  borderRadius: "50%",
                  boxShadow: `0 0 ${p.size * 2}px ${particleColor}, 0 0 ${p.size * 4}px ${particleColor}, 0 0 ${p.size * 6}px ${particleColor}`,
                }}
              />
            );
          })}
        </Box>

        <IconButton
          onClick={toggleMusic}
          sx={{
            position: "fixed",
            top: { xs: 15, md: 30 },
            right: { xs: 15, md: 30 },
            color: "#FFB7C5",
            bgcolor: "rgba(26, 11, 46, 0.4)",
            border: "1px solid rgba(255, 183, 197, 0.4)",
            backdropFilter: "blur(8px)",
            zIndex: 10,
            "&:hover": { bgcolor: "rgba(255, 183, 197, 0.2)" },
          }}
        >
          {isPlaying ? (
            <MusicNoteIcon fontSize="large" />
          ) : (
            <MusicOffIcon fontSize="large" />
          )}
        </IconButton>

        <Box
          sx={{
            minHeight: "100dvh",
            flexShrink: 0,
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            px: 2,
            pb: { xs: 12, md: 10 },
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: "300px",
              height: "300px",
              background:
                "radial-gradient(circle, rgba(255, 105, 180, 0.15) 0%, transparent 70%)",
              filter: "blur(40px)",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />

          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              zIndex: 1,
            }}
          >
            <Box
              component="img"
              src={`${baseUrl}images/logo.webp`}
              alt="Yohana Logo"
              sx={{
                width: {
                  xs: "200px",
                  sm: "300px",
                  md: "320px",
                },
                height: "auto",
                mb: 0.5,
                filter:
                  "drop-shadow(0 0 15px rgba(255, 105, 180, 0.6)) drop-shadow(0 0 30px rgba(255, 20, 147, 0.4))",
              }}
            />
            <Typography
              variant="h5"
              sx={{
                color: "#FFB7C5",
                textAlign: "center",
                fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.6rem" },
                letterSpacing: { xs: "8px", md: "12px" },
                textShadow: "0 0 15px rgba(255, 183, 197, 0.6)",
                mb: { xs: 2, md: 3 },
              }}
            >
              YOHANA
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            style={{ zIndex: 1 }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                mb: { xs: 3, md: 4 },
                position: "relative",
              }}
            >
              <Box
                sx={{
                  width: "40px",
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, #FFB7C5, transparent)",
                  margin: "0 auto",
                  opacity: 0.6,
                  mb: 1,
                }}
              />

              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255, 255, 255, 0.9)",
                  textAlign: "center",
                  maxWidth: { xs: "90vw", sm: "600px" },
                  fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.7rem" },
                  lineHeight: 2.2,
                  fontStyle: "italic",
                  textShadow: "0 2px 10px rgba(0,0,0,0.8)",
                  letterSpacing: "0.5px",
                }}
              >
                ประกายแสงแห่งรุ่งอรุณกลางอนธกาลรัตติกาลสีทมิฬประดับดารา
                <br />
                ส่องผกาผงาดรัศมีโชติแสงสังหารพร่างพราย ละม้ายคล้ายสุริยะ
                <br />
                สาดส่องสู้ดวงศศิรัศมีแขงามกลางฤทัยในคิมหันตฤดู
              </Typography>

              <Box
                sx={{
                  width: "40px",
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, #FFB7C5, transparent)",
                  margin: "0 auto",
                  opacity: 0.6,
                  mt: 1,
                }}
              />
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            style={{ zIndex: 1, width: "100%" }}
          >
            {/* ใช้ Flexbox แบบมีกล่องล่องหน (Spacer) ฝั่งซ้าย เพื่อถ่วงน้ำหนักให้ปุ่มกลางอยู่กึ่งกลางเป๊ะ */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: { xs: 1.5, sm: 2 },
                width: "100%",
                px: 1, // เผื่อขอบจอเล็กน้อยสำหรับมือถือ
              }}
            >
              {/* --- 1. กล่องเปล่าล่องหน (ไซส์เท่าปุ่มสมุด) เพื่อดันฝั่งซ้าย --- */}
              <Box
                sx={{
                  width: { xs: 45, sm: 55 },
                  height: { xs: 45, sm: 55 },
                  flexShrink: 0,
                  pointerEvents: "none",
                  visibility: "hidden", // ซ่อนไว้แต่ยังกินพื้นที่
                }}
              />

              {/* --- 2. ปุ่มสุ่ม (อยู่กึ่งกลางจอเป๊ะๆ) --- */}
              <Box sx={{ position: "relative", borderRadius: "50px" }}>
                <motion.div
                  animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                  style={{
                    position: "absolute",
                    top: -5,
                    left: -5,
                    right: -5,
                    bottom: -5,
                    borderRadius: "50px",
                    border: "2px solid #FF69B4",
                    zIndex: 0,
                  }}
                />
                <Button
                  variant="contained"
                  disabled={isRolling || openModal}
                  onClick={handleRollGacha}
                  sx={{
                    bgcolor: "rgba(26, 11, 46, 0.6)",
                    border: "1px solid rgba(255, 105, 180, 0.4)",
                    color: "#FFE4E1",
                    // ปรับขนาดฟอนต์และ Padding ในมือถือลงนิดหน่อย เพื่อไม่ให้ตกขอบ
                    fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.3rem" },
                    fontWeight: "bold",
                    px: { xs: 2.5, sm: 4, md: 6 },
                    py: { xs: 1.2, sm: 1.5, md: 2 },
                    whiteSpace: "nowrap",
                    borderRadius: "50px",
                    boxShadow:
                      "inset 0 0 20px rgba(255, 105, 180, 0.1), 0 4px 15px rgba(0,0,0,0.5)",
                    backdropFilter: "blur(12px)",
                    transition: "all 0.3s ease",
                    position: "relative",
                    overflow: "hidden",
                    zIndex: 1,
                    "&:hover": {
                      bgcolor: "rgba(255, 105, 180, 0.15)",
                      border: "1px solid rgba(255, 105, 180, 0.8)",
                      boxShadow: "0 0 20px rgba(255, 105, 180, 0.5)",
                      color: "#FFF",
                    },
                    "&.Mui-disabled": {
                      bgcolor: "rgba(26, 11, 46, 0.4)",
                      color: "rgba(255, 255, 255, 0.3)",
                      border: "1px solid rgba(255, 105, 180, 0.2)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "50%",
                      height: "100%",
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                      transform: "skewX(-20deg)",
                      animation: "shine 3s infinite",
                      "@keyframes shine": {
                        "0%": { left: "-100%" },
                        "20%": { left: "200%" },
                        "100%": { left: "200%" },
                      },
                    }}
                  />
                  ✨ ลองสุ่มหยิบไฟเย็นดูสิ ✨
                </Button>
              </Box>

              {/* --- 3. ปุ่มคอลเล็กชัน --- */}
              <Box sx={{ flexShrink: 0 }}>
                <IconButton
                  onClick={() => setOpenCollection(true)}
                  sx={{
                    bgcolor: "rgba(26, 11, 46, 0.6)",
                    border: "1px solid rgba(255, 105, 180, 0.4)",
                    color: "#FFB7C5",
                    width: { xs: 45, sm: 55 },
                    height: { xs: 45, sm: 55 },
                    boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
                    backdropFilter: "blur(12px)",
                    zIndex: 1,
                    "&:hover": {
                      bgcolor: "rgba(255, 105, 180, 0.15)",
                      border: "1px solid rgba(255, 105, 180, 0.8)",
                      boxShadow: "0 0 20px rgba(255, 105, 180, 0.5)",
                    },
                  }}
                >
                  <CollectionsBookmarkIcon
                    sx={{ fontSize: { xs: 20, sm: 28 } }}
                  />
                </IconButton>
              </Box>
            </Box>
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            style={{
              position: "absolute",
              bottom: "40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              zIndex: 1,
            }}
          >
            <Typography
              sx={{
                color: "#FFB7C5",
                fontSize: "0.6rem",
                letterSpacing: "2px",
                textShadow: "0 0 5px rgba(255, 183, 197, 0.5)",
              }}
            ></Typography>
            <KeyboardArrowDownIcon sx={{ fontSize: 30, color: "#FFB7C5" }} />
          </motion.div>
        </Box>

        <Box
          sx={{
            minHeight: "100dvh",
            width: "100%",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
            px: { xs: 2, sm: 4, md: 6 },
            py: { xs: 10, md: 12 },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "30%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "60vw",
              height: "60vw",
              background:
                "radial-gradient(circle, rgba(255, 105, 180, 0.05) 0%, transparent 60%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              textAlign: "center",
              marginBottom: "80px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              maxWidth: "640px",
              zIndex: 1,
            }}
          >
            <Box
              sx={{
                width: "1px",
                height: "60px",
                background: "linear-gradient(to bottom, transparent, #FFB7C5)",
                mb: 4,
                opacity: 0.7,
              }}
            />

            <Typography
              variant="h4"
              sx={{
                color: "rgba(255, 255, 255, 0.9)",
                lineHeight: { xs: 2.2, md: 2.4 },
                letterSpacing: { xs: "1.5px", md: "2.5px" },
                fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.5rem" },
                fontWeight: 300,
                textShadow: "0px 4px 20px rgba(0, 0, 0, 0.9)",
              }}
            >
              ประกายไฟแบบไหน
              <br />
              ที่จะ{" "}
              <Box
                component="span"
                sx={{
                  color: "#FFB7C5",
                  fontWeight: 500,
                  textShadow: "0 0 15px rgba(255, 105, 180, 0.6)",
                }}
              >
                แต้มสีสัน
              </Box>{" "}
              ให้ผืนฟ้าอันมืดมิด
              <br />
              ในค่ำคืนสุด{" "}
              <Box
                component="span"
                sx={{
                  color: "#FFFFFF",
                  fontWeight: 500,
                  textShadow: "0 0 15px rgba(255, 255, 255, 0.8)",
                }}
              >
                พิเศษ
              </Box>{" "}
              ของคุณกันนะ ?
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 5 }}>
              <Box
                sx={{
                  width: "30px",
                  height: "1px",
                  background:
                    "linear-gradient(to left, rgba(255, 105, 180, 0.6), transparent)",
                }}
              />
              <Typography
                sx={{
                  color: "#FFB7C5",
                  fontSize: "0.6rem",
                  letterSpacing: "4px",
                  opacity: 0.8,
                }}
              >
                ✦ ✦ ✦
              </Typography>
              <Box
                sx={{
                  width: "30px",
                  height: "1px",
                  background:
                    "linear-gradient(to right, rgba(255, 105, 180, 0.6), transparent)",
                }}
              />
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            style={{ width: "100%", maxWidth: "1000px", zIndex: 1 }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  sm: "repeat(3, 1fr)",
                  md: "repeat(4, 1fr)",
                },
                gap: { xs: 2.5, md: 4 },
                width: "100%",
              }}
            >
              {sparklerList.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "1 / 1.35",
                      bgcolor: "rgba(26, 11, 46, 0.4)",
                      borderRadius: "16px",
                      border: "1px solid rgba(255, 105, 180, 0.15)",
                      backdropFilter: "blur(8px)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      overflow: "hidden",
                      cursor: "pointer",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
                      transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        bgcolor: "rgba(56, 0, 107, 0.6)",
                        border: "1px solid rgba(255, 105, 180, 0.6)",
                        boxShadow:
                          "0 15px 35px rgba(255, 105, 180, 0.15), inset 0 0 20px rgba(255, 105, 180, 0.1)",
                        "& .image-default": { opacity: 0 },
                        "& .image-hover": {
                          opacity: 1,
                          transform: "scale(1.08)",
                          filter:
                            "drop-shadow(0px 0px 15px rgba(255, 105, 180, 0.5))",
                        },
                        "& .card-name": {
                          color: "#FFF",
                          textShadow: "0 0 10px rgba(255, 105, 180, 0.8)",
                        },
                        "& .name-underline": {
                          width: "60%",
                          background: "#FFB7C5",
                          boxShadow: "0 0 10px #FFB7C5",
                        },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        zIndex: 1,
                      }}
                    >
                      <Box
                        className="image-default"
                        component="img"
                        src={item.imageNo || item.image}
                        alt={`${item.name} unlit`}
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          p: "15%",
                          pb: "35%",
                          transition: "all 0.5s ease",
                          opacity: 1,
                          filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.9))",
                        }}
                      />
                      <Box
                        className="image-hover"
                        component="img"
                        src={item.image}
                        alt={`${item.name} lit`}
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          p: 2,
                          pb: 6,
                          transition: "all 0.5s ease",
                          opacity: 0,
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "60%",
                        background:
                          "linear-gradient(to bottom, transparent 0%, rgba(5, 2, 10, 0.9) 100%)",
                        pointerEvents: "none",
                        zIndex: 2,
                      }}
                    />

                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        textAlign: "center",
                        p: { xs: 2, sm: 2.5 },
                        zIndex: 3,
                      }}
                    >
                      <Typography
                        className="card-name"
                        sx={{
                          color: "rgba(255,255,255,0.85)",
                          fontSize: { xs: "0.85rem", sm: "1rem" },
                          fontWeight: 500,
                          letterSpacing: "1px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          transition: "all 0.3s ease",
                        }}
                      >
                        {item.name}
                      </Typography>

                      <Box
                        className="name-underline"
                        sx={{
                          width: "20px",
                          height: "2px",
                          background: "rgba(255, 105, 180, 0.3)",
                          margin: "8px auto 0",
                          borderRadius: "2px",
                          transition: "all 0.4s ease",
                        }}
                      />
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </Box>

        <AnimatePresence>
          {openModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => {
                if (!isRolling) {
                  setOpenModal(false);
                  setShowFireworks(false);
                  setIsFlipped(false);
                }
              }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0, // ยึดขอบขวา
                bottom: 0, // ยึดขอบล่าง (ใช้แทน 100vh เพื่อแก้ปัญหามือถือ)
                backgroundColor: "rgba(5, 2, 10, 0.85)",
                backdropFilter: "blur(12px)",
                zIndex: 9999,
                display: "flex",
                justifyContent: "center",
                alignItems: "center", // บังคับให้อยู่ตรงกลางแนวตั้ง
                padding: "20px",
                boxSizing: "border-box",
                overflow: "hidden",
              }}
            >
              <AnimatePresence>
                {!isRolling && result?.type === "SSR" && (
                  <motion.div
                    key="ssr-bg"
                    initial={{
                      opacity: 0,
                      scale: 1.3,
                      x: result.xInitial || "5%",
                      y: "-5%",
                    }}
                    animate={{
                      opacity: 0.25,
                      scale: 1.4,
                      x: result.xAnimate || "15%",
                      y: "-5%",
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 4, ease: "easeOut" }}
                    style={{
                      display: isMobile ? "none" : "block",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundImage: `url(${result.image})`,
                      backgroundSize: "cover",
                      backgroundPosition:
                        result.bgPositionDesktop || "right 10%",
                      backgroundRepeat: "no-repeat",
                      mixBlendMode: "screen",
                      zIndex: 0,
                      pointerEvents: "none",
                    }}
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {showFireworks && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 2, delay: 1 }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      zIndex: 0,
                      pointerEvents: "none",
                      overflow: "hidden",
                    }}
                  >
                    {/* แสงวาบและคลื่นกระแทก (Shockwave) */}
                    <motion.div
                      initial={{ opacity: 0.8, scale: 0.5 }}
                      animate={{ opacity: 0, scale: 2 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        background: `radial-gradient(circle at 50% 50%, #FFFFFF 0%, ${result?.themeColor || "#FF69B4"} 30%, transparent 70%)`,
                        mixBlendMode: "screen",
                      }}
                    />
                    {[...Array(2)].map((_, i) => (
                      <motion.div
                        key={`shockwave-${i}`}
                        initial={{ scale: 0, opacity: 1, x: "-50%", y: "-50%" }}
                        animate={{ scale: i === 0 ? 2.5 : 4, opacity: 0 }}
                        transition={{
                          duration: 0.7 + i * 0.2,
                          ease: "easeOut",
                        }}
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          width: "300px",
                          height: "300px",
                          borderRadius: "50%",
                          border: `4px solid ${i === 0 ? "#FFF" : result?.themeColor || "#FF69B4"}`,
                          boxShadow: `0 0 20px ${result?.themeColor || "#FF69B4"}, inset 0 0 20px ${result?.themeColor || "#FF69B4"}`,
                        }}
                      />
                    ))}

                    {fireworkGeometry.map((geo, i) => {
                      const tx = Math.cos(geo.angle) * geo.distance;
                      const ty = Math.sin(geo.angle) * geo.distance;

                      const colors = [
                        result?.themeColor || "#FF69B4",
                        result?.themeGrad || "#FFB7C5",
                        "#FFFFFF",
                        "#FFE4E1",
                      ];
                      // ดึงสีตาม index แทนการสุ่มเพื่อไม่ให้สีกระพริบ
                      const color = colors[i % colors.length];

                      return (
                        <motion.div
                          key={`explosion-part-${i}`}
                          initial={{
                            opacity: 1,
                            scale: 1,
                            x: "-50%",
                            y: "-50%",
                            left: "50%",
                            top: "50%",
                          }}
                          animate={{
                            opacity: [1, 1, 0],
                            scale: [1, 0.5, 0],
                            x: `calc(-50% + ${tx}vw)`,
                            y: `calc(-50% + ${ty}vh)`,
                          }}
                          transition={{
                            duration: geo.duration,
                            ease: "easeOut",
                          }}
                          style={{
                            position: "absolute",
                            width: geo.size,
                            height: geo.size,
                            borderRadius: "50%",
                            backgroundColor: color,
                            boxShadow: `0 0 ${geo.size * 2}px ${color}, 0 0 ${geo.size * 4}px ${color}`,
                          }}
                        />
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  overflowY: isMobile ? "hidden" : "auto", // 💡 เลื่อนตรงนี้มาไว้ที่กล่องในแทน
                  overflowX: "hidden",
                  display: "flex",
                  padding: "20px",
                  boxSizing: "border-box",
                  zIndex: 10,
                }}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    margin: "auto",
                    width: "100%",
                    maxWidth: result?.type === "SSR" ? "700px" : "450px",
                    maxHeight: "100%", // ป้องกันคอนเทนต์ดันขอบบนล่างจนหลุดกึ่งกลาง
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transition: "max-width 0.3s ease-in-out",
                    zIndex: 10,
                  }}
                >
                  {isRolling && (
                    <motion.div
                      key="rolling"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.2 }}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "200px",
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: 180,
                          height: 180,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {/* เอฟเฟกต์กากบาทหมุน */}
                        <motion.div
                          animate={{
                            scale: [0.8, 1.5, 0.8],
                            rotate: [0, 90, 180],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              width: "120%",
                              height: "2px",
                              background:
                                "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)",
                            }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              width: "2px",
                              height: "120%",
                              background:
                                "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)",
                            }}
                          />
                        </motion.div>

                        {/* ประกายไฟวงนอก (ดึงจาก useMemo เดิมเพื่อความลื่น) */}
                        {rollingSparks.map((spark, i) => (
                          <motion.div
                            key={`spark-${i}`}
                            initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
                            animate={{
                              opacity: [1, 1, 0],
                              scale: [0, 1.5, 0],
                              x: Math.cos(spark.angle) * spark.distance,
                              y: Math.sin(spark.angle) * spark.distance,
                            }}
                            transition={{
                              duration: spark.duration,
                              repeat: Infinity,
                              ease: "easeOut",
                              delay: spark.delay,
                            }}
                            style={{
                              position: "absolute",
                              width: spark.size,
                              height: spark.size,
                              borderRadius: "50%",
                              backgroundColor: spark.colorType,
                              boxShadow: `0 0 ${spark.size * 2.5}px ${spark.colorType}`,
                            }}
                          />
                        ))}

                        {/* แกนกลางประกายไฟ */}
                        <motion.div
                          animate={{
                            scale: [1, 1.8, 1],
                            opacity: [0.9, 1, 0.9],
                          }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          style={{
                            position: "absolute",
                            width: 18,
                            height: 18,
                            borderRadius: "50%",
                            backgroundColor: "#FFF",
                            boxShadow: `
                          0 0 30px 10px rgba(255, 105, 180, 0.8), 
                          0 0 60px 30px rgba(255, 183, 197, 0.5)
                        `,
                          }}
                        />
                      </Box>
                    </motion.div>
                  )}

                  {!isRolling && result && (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center", // เสริมความชัวร์ให้คอนเทนต์กลาง
                        perspective: 1000,
                      }}
                    >
                      {result.type === "SSR" ? (
                        <motion.div
                          key="result-ssr"
                          initial={{ opacity: 0, y: 50, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{
                            type: "spring",
                            damping: 15,
                            stiffness: 80,
                            duration: 0.8,
                          }}
                          style={{
                            width: "100%",
                            maxWidth: "900px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                          }}
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              top: "-20%",
                              left: "-10%",
                              width: "120%",
                              height: "140%",
                              pointerEvents: "none",
                              zIndex: 1,
                            }}
                          >
                            {/* แทนที่อนุภาคพื้นหลัง SSR ด้วย ssrFloatParticles */}
                            {ssrFloatParticles.map((p, i) => {
                              const color = p.isEven
                                ? result.themeColor || "#FF69B4"
                                : "#FFFFFF";
                              return (
                                <motion.div
                                  key={`ssr-float-particle-${i}`}
                                  initial={{ opacity: 0, x: 0, y: "100%" }}
                                  animate={{
                                    opacity: [0, 0.8, 0.8, 0],
                                    y: ["100%", "-20%"],
                                    x: [0, p.driftX, p.driftX * 1.5],
                                  }}
                                  transition={{
                                    duration: p.duration,
                                    repeat: Infinity,
                                    delay: p.delay,
                                    ease: "linear",
                                  }}
                                  style={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: p.startX,
                                    width: p.size,
                                    height: p.size,
                                    borderRadius: "50%",
                                    backgroundColor: color,
                                    boxShadow: `0 0 ${p.size * 2}px ${color}`,
                                  }}
                                />
                              );
                            })}
                          </Box>

                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              zIndex: 2,
                            }}
                          >
                            <Box
                              component="img"
                              src={result.image}
                              alt={result.name}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://via.placeholder.com/500x650/transparent/FF69B4?text=Image";
                              }}
                              sx={{
                                width: "100%",
                                maxWidth: "500px",
                                height: "auto",
                                maxHeight: {
                                  xs: "50dvh",
                                  sm: "calc(100dvh - 320px)",
                                  md: "calc(100dvh - 280px)",
                                },
                                objectFit: "contain",
                                filter: `drop-shadow(0px 0px 5px ${result.themeColor || "#FF69B4"}99)`,
                              }}
                            />
                          </div>

                          <Box
                            sx={{
                              perspective: 1000,
                              width: "100%",
                              mt: { xs: -1, sm: -2 },
                              zIndex: 3,
                            }}
                          >
                            <motion.div
                              initial="rest"
                              animate={
                                !canHover && isFlipped ? "hover" : "rest"
                              }
                              whileHover={canHover ? "hover" : "rest"}
                              onClick={() => {
                                if (!canHover) setIsFlipped(!isFlipped);
                              }}
                              style={{ width: "100%", position: "relative" }}
                            >
                              <motion.div
                                variants={{
                                  rest: { rotateY: 0 },
                                  hover: { rotateY: 180 },
                                }}
                                transition={{ duration: 0.6 }}
                                style={{
                                  width: "100%",
                                  transformStyle: "preserve-3d",
                                  WebkitTransformStyle: "preserve-3d",
                                  position: "relative",
                                  display: "grid",
                                }}
                              >
                                <Box
                                  sx={{
                                    gridArea: "1 / 1",
                                    backfaceVisibility: "hidden",
                                    WebkitBackfaceVisibility: "hidden",
                                    position: "relative",
                                    width: "100%",
                                    padding: "3px",
                                    borderRadius: "16px",
                                    background: `linear-gradient(135deg, ${result.themeColor || "#FF69B4"}, ${result.themeGrad || "#FFB7C5"}, ${result.themeColor || "#FF69B4"}, #FFF)`,
                                    backgroundSize: "300% 300%",
                                    [`@keyframes pulseFrameFront_${result.id}`]:
                                      {
                                        "0%": {
                                          backgroundPosition: "0% 50%",
                                          boxShadow: `0 10px 40px ${result.themeColor || "#FF69B4"}66, 0 0 10px ${result.themeColor || "#FF69B4"}40`,
                                        },
                                        "50%": {
                                          backgroundPosition: "100% 50%",
                                          boxShadow: `0 10px 40px ${result.themeColor || "#FF69B4"}AA, 0 0 45px ${result.themeColor || "#FF69B4"}99`,
                                        },
                                        "100%": {
                                          backgroundPosition: "0% 50%",
                                          boxShadow: `0 10px 40px ${result.themeColor || "#FF69B4"}66, 0 0 10px ${result.themeColor || "#FF69B4"}40`,
                                        },
                                      },
                                    animation: `pulseFrameFront_${result.id} 4s ease-in-out infinite`,
                                  }}
                                >
                                  <Box
                                    sx={{
                                      width: "100%",
                                      height: "100%",
                                      bgcolor: "rgba(5, 2, 10, 0.95)",
                                      borderRadius: "13px",
                                      p: { xs: 2, sm: 2.5 },
                                      pb: { xs: 4, sm: 5 },
                                      textAlign: "center",
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      minHeight: { xs: "120px", sm: "200px" },
                                      transform: "translateZ(1px)",
                                      position: "relative",
                                    }}
                                  >
                                    <Typography
                                      variant="overline"
                                      sx={{
                                        position: "absolute",
                                        top: { xs: "-14px", sm: "-18px" },
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        display: "inline-block",
                                        color: "#FFF",
                                        bgcolor: `${result.themeColor || "#FF69B4"}33`,
                                        fontWeight: "900",
                                        letterSpacing: { xs: 3, sm: 5 },
                                        fontSize: {
                                          xs: "0.65rem",
                                          sm: "0.80rem",
                                        },
                                        px: { xs: 2, sm: 3 },
                                        py: { xs: 0.3, sm: 0.5 },
                                        border: `1px solid ${result.themeColor || "#FF69B4"}CC`,
                                        borderRadius: "30px",
                                        backdropFilter: "blur(6px)",
                                        textShadow: `0 0 10px ${result.themeColor || "#FF69B4"}`,
                                        boxShadow: `0 0 15px ${result.themeColor || "#FF69B4"}80`,
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      ✦ {result.nameCha} ✦
                                    </Typography>

                                    <Typography
                                      variant="body1"
                                      sx={{
                                        color: "#e0e0e0",
                                        lineHeight: { xs: 1.4, sm: 1.6 },
                                        fontSize: { xs: "0.7rem", sm: "1rem" },
                                        textAlign: "center",
                                        whiteSpace: "pre-line",
                                        width: "100%",
                                      }}
                                    >
                                      {result.quote}
                                    </Typography>

                                    <Typography
                                      variant="caption"
                                      sx={{
                                        position: "absolute",
                                        bottom: "12px",
                                        color: result.themeColor || "#FF69B4",
                                        opacity: 0.8,
                                        fontSize: {
                                          xs: "0.4rem",
                                          sm: "0.6rem",
                                        },
                                        letterSpacing: 1,
                                      }}
                                    >
                                      ✨ แตะการ์ดเพื่อพลิก ✨
                                    </Typography>
                                  </Box>
                                </Box>

                                <Box
                                  sx={{
                                    gridArea: "1 / 1",
                                    backfaceVisibility: "hidden",
                                    WebkitBackfaceVisibility: "hidden",
                                    transform: "rotateY(180deg)",
                                    position: "relative",
                                    width: "100%",
                                    height: "100%",
                                    padding: "3px",
                                    borderRadius: "16px",
                                    background: `linear-gradient(135deg, ${result.themeColor || "#FF69B4"}, ${result.themeGrad || "#FFB7C5"}, ${result.themeColor || "#FF69B4"}, #FFF)`,
                                    backgroundSize: "300% 300%",
                                    [`@keyframes pulseFrameBack_${result.id}`]:
                                      {
                                        "0%": {
                                          backgroundPosition: "0% 50%",
                                          boxShadow: `0 10px 40px ${result.themeColor || "#FF69B4"}66, 0 0 10px ${result.themeColor || "#FF69B4"}40`,
                                        },
                                        "50%": {
                                          backgroundPosition: "100% 50%",
                                          boxShadow: `0 10px 40px ${result.themeColor || "#FF69B4"}AA, 0 0 45px ${result.themeColor || "#FF69B4"}99`,
                                        },
                                        "100%": {
                                          backgroundPosition: "0% 50%",
                                          boxShadow: `0 10px 40px ${result.themeColor || "#FF69B4"}66, 0 0 10px ${result.themeColor || "#FF69B4"}40`,
                                        },
                                      },
                                    animation: `pulseFrameBack_${result.id} 4s ease-in-out infinite`,
                                  }}
                                >
                                  <Box
                                    sx={{
                                      width: "100%",
                                      height: "100%",
                                      bgcolor: "rgba(5, 2, 10, 0.95)",
                                      borderRadius: "13px",
                                      p: { xs: 1.5, sm: 2 },
                                      textAlign: "center",
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      minHeight: { xs: "120px", sm: "200px" },
                                      transform: "translateZ(1px)",
                                    }}
                                  >
                                    <Typography
                                      variant="h4"
                                      sx={{
                                        mt: 0,
                                        mb: 0.5,
                                        fontWeight: "bold",
                                        fontSize: { xs: "1rem", sm: "1.5rem" },
                                        color: "#FFFFFF",
                                        textShadow: `1px 1px 3px ${
                                          result.id === 10 || result.id === 18
                                            ? "rgba(135, 135, 135, 0.8)"
                                            : "rgba(0, 0, 0, 0.8)"
                                        }, 0 0 8px ${result.themeColor || "#FF69B4"}`,
                                      }}
                                    >
                                      {result.name}
                                    </Typography>

                                    <Typography
                                      sx={{
                                        display: { xs: "none", sm: "block" },
                                        color: result.themeColor || "#FF69B4",
                                        opacity: 0.7,
                                        mb: 0,
                                        letterSpacing: 1,
                                      }}
                                    >
                                      ✧ ✧ ✧
                                    </Typography>

                                    <Typography
                                      variant="body1"
                                      sx={{
                                        width: "100%",
                                        color: "#e0e0e0",
                                        fontStyle: "italic",
                                        lineHeight: { xs: 1.4, sm: 1.6 }, // ✨ ปรับระยะบรรทัดให้กระชับขึ้น
                                        fontSize: {
                                          xs: "0.7rem",
                                          sm: "0.85rem",
                                        }, // ✨ ปรับขนาดฟอนต์บนมือถือให้พอดี
                                        textAlign: "center",
                                        whiteSpace: "pre-line",
                                        textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                                        mb: { xs: 1.5, sm: 2 }, // ✨ ลดระยะห่างขอบล่างนิดหน่อย
                                      }}
                                    >
                                      {result.desc}
                                    </Typography>

                                    <Typography
                                      variant="caption"
                                      sx={{
                                        position: "absolute",
                                        bottom: "12px",
                                        color: result.themeColor || "#FF69B4",
                                        opacity: 0.8,
                                        fontSize: {
                                          xs: "0.4rem",
                                          sm: "0.6rem",
                                        },
                                        letterSpacing: 1,
                                      }}
                                    >
                                      ✨ แตะที่ว่างเพื่อปิด ✨
                                    </Typography>
                                  </Box>
                                </Box>
                              </motion.div>
                            </motion.div>
                          </Box>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="result-other"
                          initial={{
                            rotateY: 90,
                            scale: 0.8,
                            opacity: 0,
                            y: 50,
                          }}
                          animate={{ rotateY: 0, scale: 1, opacity: 1, y: 0 }}
                          transition={{
                            type: "spring",
                            damping: 15,
                            stiffness: 80,
                            duration: 0.8,
                          }}
                          style={{
                            width: "100%",
                            maxWidth: "450px",
                            perspective: 1000,
                            position: "relative",
                          }}
                        >
                          {isSR && (
                            <Box
                              sx={{
                                position: "absolute",
                                top: "-15%",
                                left: "-15%",
                                width: "130%",
                                height: "130%",
                                pointerEvents: "none",
                                zIndex: 0,
                              }}
                            >
                              {[...Array(15)].map((_, i) => {
                                const size = Math.random() * 15 + 10;
                                const top = `${Math.random() * 100}%`;
                                const left = `${Math.random() * 100}%`;
                                const delay = Math.random() * 2;
                                const duration = Math.random() * 1.5 + 1.5;

                                return (
                                  <motion.div
                                    key={`sr-sparkle-${i}`}
                                    initial={{
                                      opacity: 0,
                                      scale: 0,
                                      rotate: 0,
                                    }}
                                    animate={{
                                      opacity: [0, 1, 1, 0],
                                      scale: [0, 1, 0.8, 0],
                                      rotate: [0, 90, 180],
                                    }}
                                    transition={{
                                      duration: duration,
                                      repeat: Infinity,
                                      delay: delay,
                                      ease: "easeInOut",
                                    }}
                                    style={{
                                      position: "absolute",
                                      top: top,
                                      left: left,
                                      width: `${size}px`,
                                      height: `${size}px`,
                                      backgroundColor: "#FFF",
                                      clipPath:
                                        "polygon(50% 0%, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0% 50%, 40% 40%)",
                                      boxShadow:
                                        "0 0 15px #FF69B4, 0 0 30px #FFB7C5",
                                    }}
                                  />
                                );
                              })}
                            </Box>
                          )}

                          <motion.div
                            animate={{ y: [-5, 5, -5] }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            style={{ zIndex: 1, position: "relative" }}
                          >
                            <motion.div
                              initial="rest"
                              animate={
                                !canHover && isFlipped ? "hover" : "rest"
                              }
                              whileHover={canHover ? "hover" : "rest"}
                              onClick={() => {
                                if (!canHover) setIsFlipped(!isFlipped);
                              }}
                              style={{ width: "100%", position: "relative" }}
                            >
                              <motion.div
                                variants={{
                                  rest: { rotateY: 0 },
                                  hover: { rotateY: 180 },
                                }}
                                transition={{ duration: 0.6 }}
                                style={{
                                  width: "100%",
                                  transformStyle: "preserve-3d",
                                  WebkitTransformStyle: "preserve-3d",
                                  position: "relative",
                                }}
                              >
                                <Box
                                  sx={{
                                    backfaceVisibility: "hidden",
                                    WebkitBackfaceVisibility: "hidden",
                                    position: "relative",
                                    padding: "3px",
                                    borderRadius: "24px",
                                    background: cardBorderGradient,
                                    boxShadow: cardGlow,
                                    animation:
                                      "gradient-shift 4s ease infinite",
                                  }}
                                >
                                  <Card
                                    sx={{
                                      position: "relative",
                                      width: "100%",
                                      height: { xs: "70vh", sm: "600px" },
                                      maxHeight: { xs: "500px", sm: "none" },
                                      bgcolor: "#05020A",
                                      color: "white",
                                      borderRadius: "21px",
                                      display: "flex",
                                      flexDirection: "column",
                                      overflow: "hidden",
                                      boxShadow:
                                        "inset 0 0 20px rgba(0,0,0,0.8)",
                                      transform: "translateZ(1px)",
                                    }}
                                  >
                                    <Box
                                      component="img"
                                      src={result.image}
                                      alt={result.name}
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src =
                                          "https://via.placeholder.com/450x650/1a1025/FF69B4?text=Sparkler+Image";
                                      }}
                                      sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "calc(100% - 130px)",
                                        objectFit: "contain",
                                        mt: 2,
                                      }}
                                    />
                                    <Box
                                      sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        background:
                                          "linear-gradient(to bottom, rgba(5, 2, 10, 0) 60%, rgba(5, 2, 10, 0.95) 100%)",
                                        pointerEvents: "none",
                                      }}
                                    />
                                    <CardContent
                                      sx={{
                                        position: "absolute",
                                        bottom: 0,
                                        left: 0,
                                        width: "100%",
                                        textAlign: "center",
                                        p: { xs: 2.5, sm: 4 },
                                        pb: { xs: 2, sm: 2 },
                                        zIndex: 2,
                                      }}
                                    >
                                      <Typography
                                        variant="overline"
                                        sx={{
                                          display: "inline-block",
                                          color: "#FFF",
                                          bgcolor: tagBg,
                                          fontWeight: "900",
                                          letterSpacing: { xs: 3, sm: 5 },
                                          fontSize: {
                                            xs: "0.65rem",
                                            sm: "0.80rem",
                                          },
                                          px: { xs: 2, sm: 3 },
                                          py: { xs: 0.3, sm: 0.5 },
                                          border: `1px solid ${tagBorder}`,
                                          borderRadius: "30px",
                                          mb: 1.5,
                                          backdropFilter: "blur(6px)",
                                          textShadow: tagGlow,
                                        }}
                                      >
                                        ✦ {result.nameCha} ✦
                                      </Typography>
                                      <Typography
                                        variant="h4"
                                        sx={{
                                          fontWeight: "bold",
                                          fontSize: {
                                            xs: "1rem",
                                            sm: "1.8rem",
                                          },
                                          color: "#FFFFFF",
                                          textShadow: nameShadow,
                                          mb: 0.5,
                                        }}
                                      >
                                        {result.name}
                                      </Typography>

                                      <Typography
                                        variant="caption"
                                        sx={{
                                          display: "block",
                                          color: btnColor,
                                          fontSize: {
                                            xs: "0.4rem",
                                            sm: "0.6rem",
                                          },
                                          letterSpacing: 1,
                                          opacity: 0.8,
                                        }}
                                      >
                                        ✨ แตะการ์ดเพื่อพลิก ✨
                                      </Typography>
                                    </CardContent>
                                  </Card>
                                </Box>

                                <Box
                                  sx={{
                                    backfaceVisibility: "hidden",
                                    WebkitBackfaceVisibility: "hidden",
                                    transform: "rotateY(180deg)",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    padding: "3px",
                                    borderRadius: "24px",
                                    background: cardBorderGradient,
                                    boxShadow: cardGlow,
                                  }}
                                >
                                  <Card
                                    sx={{
                                      width: "100%",
                                      height: "100%",
                                      bgcolor: "rgba(5, 2, 10, 0.95)",
                                      color: "white",
                                      borderRadius: "21px",
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      p: { xs: 2.5, sm: 4 },
                                      position: "relative",
                                      overflow: "hidden",
                                      transform: "translateZ(1px)",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        zIndex: 1,
                                        textAlign: "center",
                                        width: "100%",
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          color: btnColor,
                                          opacity: 0.7,
                                          mb: 2,
                                          letterSpacing: 3,
                                        }}
                                      >
                                        ✧ ✧ ✧
                                      </Typography>

                                      <Typography
                                        variant="body1"
                                        sx={{
                                          color: "#e0e0e0",
                                          fontStyle: "italic",
                                          lineHeight: { xs: 1.4, sm: 1.8 },
                                          fontSize: {
                                            xs: "0.75rem",
                                            sm: "0.95rem",
                                          },
                                          textAlign: "center",
                                          mb: 3,
                                          whiteSpace: "pre-line",
                                          textShadow:
                                            "0 2px 4px rgba(0,0,0,0.5)",
                                        }}
                                      >
                                        {result.desc}
                                      </Typography>

                                      <Box
                                        sx={{
                                          width: "40px",
                                          height: "2px",
                                          bgcolor: btnColor,
                                          margin: "0 auto",
                                          opacity: 0.5,
                                          borderRadius: "2px",
                                          boxShadow: `0 0 10px ${btnColor}`,
                                        }}
                                      />
                                    </Box>

                                    <Typography
                                      variant="caption"
                                      sx={{
                                        position: "absolute",
                                        bottom: "20px",
                                        color: btnColor,
                                        opacity: 0.8,
                                        fontSize: {
                                          xs: "0.4rem",
                                          sm: "0.6rem",
                                        },
                                        letterSpacing: 1,
                                        zIndex: 1,
                                      }}
                                    >
                                      ✨ แตะที่ว่างเพื่อปิด ✨
                                    </Typography>
                                  </Card>
                                </Box>
                              </motion.div>
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* -------------------- เพิ่ม Dialog สำหรับเปิดดู Collection -------------------- */}
        <Dialog
          open={openCollection}
          onClose={() => setOpenCollection(false)}
          maxWidth="md"
          fullWidth
          scroll="paper" // ล็อก Header ไว้ ให้ Scroll เฉพาะเนื้อหาด้านใน
          PaperProps={{
            sx: {
              bgcolor: "rgba(10, 2, 20, 0.95)", // ทำให้พื้นหลังเข้มขึ้นเพื่อให้อ่านตัวหนังสือชัด
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 105, 180, 0.4)",
              borderRadius: { xs: "16px", sm: "24px" }, // ขอบโค้งพอดีกับจอมือถือและคอม
              color: "#FFF",
              boxShadow:
                "0 15px 50px rgba(0,0,0,0.9), inset 0 0 20px rgba(255, 105, 180, 0.15)",
              maxHeight: { xs: "92vh", sm: "85vh" }, // ปรับไม่ให้ล้นจอมือถือบน-ล่าง
              margin: { xs: "16px", sm: "32px" }, // เว้นขอบซ้ายขวาให้ดูเป็น Pop-up สวยๆ
              overflow: "hidden",
            },
          }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              pt: { xs: 2.5, sm: 3 }, // ลดระยะห่างขอบบนลง
              pb: 1.5, // ลดระยะห่างขอบล่างลง
              // สร้างเอฟเฟกต์แสงออร่าแผ่จากตรงกลางด้านบน
              background:
                "radial-gradient(ellipse at top, rgba(255, 105, 180, 0.2) 0%, rgba(10, 2, 20, 0.95) 70%)",
              borderBottom: "1px solid rgba(255, 105, 180, 0.25)",
              overflow: "hidden",
            }}
          >
            {/* เอฟเฟกต์แสงสะท้อนเบาๆ ด้านบนสุด */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: "20%",
                right: "20%",
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(255, 183, 197, 0.8), transparent)",
                boxShadow: "0 2px 15px rgba(255, 183, 197, 0.8)",
              }}
            />

            {/* ปุ่มปิดแบบ Glassmorphism */}
            <IconButton
              onClick={() => setOpenCollection(false)}
              sx={{
                position: "absolute",
                right: { xs: 8, sm: 16 }, // ขยับให้เข้ามุมพอดีกับความสูงใหม่
                top: { xs: 8, sm: 16 },
                color: "#FFB7C5",
                bgcolor: "rgba(255, 105, 180, 0.1)",
                border: "1px solid rgba(255, 105, 180, 0.3)",
                backdropFilter: "blur(4px)",
                "&:hover": {
                  bgcolor: "rgba(255, 105, 180, 0.25)",
                  color: "#FFF",
                  transform: "rotate(90deg) scale(1.1)",
                  boxShadow: "0 0 15px rgba(255, 105, 180, 0.5)",
                },
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                zIndex: 2,
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>

            {/* ชื่อหัวข้อ */}
            <Typography
              variant="h4"
              sx={{
                color: "#FFFFFF",
                fontWeight: 600,
                letterSpacing: { xs: 1.5, sm: 3 },
                fontSize: { xs: "1.1rem", sm: "1.5rem" }, // ลดขนาดฟอนต์ลงนิดหน่อยให้สมดุล
                textShadow:
                  "0 0 15px rgba(255, 183, 197, 0.8), 0 0 30px rgba(255, 105, 180, 0.5)",
                display: "flex",
                alignItems: "center",
                gap: { xs: 1, sm: 2 },
                zIndex: 1,
              }}
            >
              <Box
                component="span"
                sx={{ color: "#FFB7C5", fontSize: "0.8em", opacity: 0.8 }}
              >
                ✦
              </Box>
              สมุดบันทึกไฟเย็น
              <Box
                component="span"
                sx={{ color: "#FFB7C5", fontSize: "0.8em", opacity: 0.8 }}
              >
                ✦
              </Box>
            </Typography>

            {/* ส่วนบอกจำนวนที่สะสมได้ */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mt: 1, // ลดระยะห่างระหว่างชื่อหัวข้อกับจำนวนบรรทัดนี้
                zIndex: 1,
              }}
            >
              <Box
                sx={{
                  width: { xs: "30px", sm: "50px" },
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, #FFB7C5)",
                  opacity: 0.6,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: "#FFE4E1",
                  letterSpacing: 2,
                  fontSize: { xs: "0.75rem", sm: "0.9rem" },
                  fontWeight: 300,
                  fontStyle: "italic",
                  textShadow: "0 2px 4px rgba(0,0,0,0.8)",
                }}
              >
                รวบรวมแล้ว{" "}
                <Box
                  component="span"
                  sx={{ fontWeight: "bold", color: "#FFF" }}
                >
                  {collectedIds.length}
                </Box>{" "}
                / {sparklerItems.length} แบบ
              </Typography>
              <Box
                sx={{
                  width: { xs: "30px", sm: "50px" },
                  height: "1px",
                  background: "linear-gradient(270deg, transparent, #FFB7C5)",
                  opacity: 0.6,
                }}
              />
            </Box>
          </DialogTitle>

          {/* เนื้อหาด้านใน (Grid) */}
          <DialogContent
            sx={{
              p: { xs: 2, sm: 3, md: 4 }, // ปรับระยะห่างขอบให้พอดีหน้าจอแต่ละไซส์
              "&::-webkit-scrollbar": { width: "6px" },
              "&::-webkit-scrollbar-track": {
                background: "rgba(255,255,255,0.02)",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(255, 105, 180, 0.4)",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "rgba(255, 105, 180, 0.7)",
              },
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  sm: "repeat(3, 1fr)",
                  md: "repeat(4, 1fr)",
                },
                gap: { xs: 1.5, sm: 2.5, md: 3 },
              }}
            >
              {sparklerItems.map((item) => {
                const isCollected = collectedIds.includes(item.id);
                const isItemSR = item.type === "SR";

                const borderColor = isCollected
                  ? isItemSR
                    ? "rgba(255, 255, 255, 0.6)"
                    : item.themeColor || "#FF69B4"
                  : "rgba(255,255,255,0.15)"; // กรอบตอนยังไม่ได้การ์ดให้สว่างขึ้นนิดนึง

                return (
                  <Box
                    key={item.id}
                    sx={{
                      position: "relative",
                      aspectRatio: "1/1.4",
                      borderRadius: "14px",
                      padding: "2px",
                      background: isCollected
                        ? `linear-gradient(135deg, rgba(255,255,255,0.3) 0%, ${borderColor} 50%, rgba(255,255,255,0.1) 100%)`
                        : "rgba(255,255,255,0.1)",
                      boxShadow: isCollected
                        ? `0 5px 15px rgba(0,0,0,0.6), 0 0 15px ${borderColor}40`
                        : "none",
                      transition:
                        "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      cursor: isCollected ? "pointer" : "default",
                      "&:hover": isCollected
                        ? {
                            transform: "translateY(-6px)",
                            boxShadow: `0 8px 25px rgba(0,0,0,0.8), 0 0 25px ${borderColor}90`,
                          }
                        : {},
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "12px",
                        bgcolor: "rgba(10, 2, 20, 0.95)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {/* แสงรัศมีด้านหลัง (เฉพาะ SSR) */}
                      {isCollected && !isItemSR && (
                        <Box
                          sx={{
                            position: "absolute",
                            width: "150%",
                            height: "150%",
                            background: `radial-gradient(circle, ${borderColor}33 0%, transparent 60%)`,
                            zIndex: 0,
                          }}
                        />
                      )}

                      {/* ภาพไฟเย็น */}
                      <Box
                        component="img"
                        src={item.image}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://via.placeholder.com/150x200/1a1025/FF69B4?text=?";
                        }}
                        sx={{
                          width: "85%",
                          height: "85%",
                          objectFit: "contain",
                          mb: 4, // ดันภาพขึ้นนิดหน่อยเพื่อเว้นที่ให้ชื่อไฟเย็นด้านล่าง
                          zIndex: 1,
                          filter: isCollected
                            ? `drop-shadow(0 0 8px ${borderColor}66)`
                            : "brightness(0) opacity(0.25)", // ดรอปเป็นเงา
                          transition: "all 0.3s ease",
                        }}
                      />

                      {/* ส่วนข้อความด้านล่าง */}
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          width: "100%",
                          background: isCollected
                            ? "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, transparent 100%)" // ไล่สีดำให้เข้มขึ้นเพื่อบังภาพด้านหลัง
                            : "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
                          pt: 3,
                          pb: 1,
                          px: 1,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          zIndex: 2,
                        }}
                      >
                        {/* ชื่อตัวละคร */}
                        <Typography
                          sx={{
                            fontSize: { xs: "0.7rem", sm: "0.85rem" },
                            color: isCollected
                              ? "#FFF"
                              : "rgba(255,255,255,0.3)",
                            fontWeight: isCollected ? "bold" : "normal",
                            letterSpacing: 1,
                            textShadow: isCollected
                              ? `0 0 8px ${borderColor}`
                              : "none",
                            mb: 0.2,
                          }}
                        >
                          {isCollected ? item.nameCha : "???"}
                        </Typography>

                        {/* ชื่อไฟเย็น */}
                        {isCollected && (
                          <Typography
                            sx={{
                              fontSize: { xs: "0.55rem", sm: "0.65rem" },
                              color: isItemSR ? "#B0BEC5" : "#FFF", // SR สีเดิม, SSR สีขาวแบบ nameCha
                              fontWeight: "normal",
                              textShadow: isItemSR
                                ? "none"
                                : `0 0 8px ${borderColor}`, // SSR เรืองแสงสีตามการ์ดเหมือน nameCha
                              lineHeight: 1.2,
                              textAlign: "center",
                              opacity: 0.9,
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              wordBreak: "break-word",
                            }}
                          >
                            {item.name}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}
