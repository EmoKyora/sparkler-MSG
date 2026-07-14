import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
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
    name: "ไฟเย็นกล่องไม้ไขลาน",
    type: "Normal",
    desc: `เมื่อปลายไฟเย็นถูกจุดขึ้น เสียงเพลงราวกล่องดนตรีจะค่อยบรรเลงคลอไปในบรรยากาศ มันอาจจะเป็นทำนองที่ไม่เคยคุ้น.. หรืออาจจะเป็นเพลงที่คุณเคยได้ยินมาก่อนสักครั้งหนึ่ง\n\nโอ๊ะ ดูเหมือนว่าถ้าสะบัดไปมามันจะเปลี่ยนจังหวะได้ด้วยนะ ? \nลองเล่นเป็นวาทยากรสักครั้งไหม`,
    quote: "",
    image: `${baseUrl}images/sparkler/Shoji.png`,
    rate: 8.33,
  },
  {
    id: 2,
    name: "ไฟเย็นกล่องไม้ไขลาน",
    type: "SR",
    desc: `เมื่อปลายไฟเย็นถูกจุดขึ้น เสียงเพลงราวกล่องดนตรีจะค่อยบรรเลงคลอไปในบรรยากาศ มันอาจจะเป็นทำนองที่ไม่เคยคุ้น.. หรืออาจจะเป็นเพลงที่คุณเคยได้ยินมาก่อนสักครั้งหนึ่ง\n\nโอ๊ะ ดูเหมือนว่าถ้าสะบัดไปมามันจะเปลี่ยนจังหวะได้ด้วยนะ ? \nลองเล่นเป็นวาทยากรสักครั้งไหม`,
    quote: "",
    image: `${baseUrl}images/chibi/Shoji.png`,
    rate: 5,
  },
  {
    id: 3,
    name: "ไฟเย็นกล่องไม้ไขลาน",
    type: "SSR",
    desc: `เมื่อปลายไฟเย็นถูกจุดขึ้น เสียงเพลงราวกล่องดนตรีจะค่อยบรรเลงคลอไปในบรรยากาศ มันอาจจะเป็นทำนองที่ไม่เคยคุ้น.. หรืออาจจะเป็นเพลงที่คุณเคยได้ยินมาก่อนสักครั้งหนึ่ง\n\nโอ๊ะ ดูเหมือนว่าถ้าสะบัดไปมามันจะเปลี่ยนจังหวะได้ด้วยนะ ?\nลองเล่นเป็นวาทยากรสักครั้งไหม`,
    quote: `กระดาษในมือเขาเขียนว่า\n\n[ อันนี้ของคุณครับ ]\n[ ขอให้สนุกกับงานนะครับ ]`,
    image: `${baseUrl}images/ssr/Shoji.png`,
    rate: 3.33,
    themeColor: "#096CFF",
    themeGrad: "#87CEFA",
  },
  {
    id: 4,
    name: "ไฟเย็นเซย์รินะ",
    type: "Normal",
    desc: `เมื่อจุดมวลมายาจะปรากฎขึ้น อาจเป็นสิ่งที่คุณนึกถึงชั่วขณะ ถวิลหา ไม่ว่าจะเป็นความทรงจำ สิ่งของ หรือใครสักคน แต่สิ่งที่ปรากฏ จะเป็นเพียงเศษเสี้ยวเล็ก ๆ ที่มากพอให้คุณนึกถึงเรื่องราวพวกนั้นเท่านั้น\n\nคิดถึงหรือเปล่า? \nอย่างน้อย มันก็คงอยู่เป็นเพื่อนคุณ ..จนกว่า\nแสงไฟนั้นจะดับลง`,
    quote: "",
    image: `${baseUrl}images/sparkler/Shoji.png`,
    rate: 8.33,
  },
  {
    id: 5,
    name: "ไฟเย็นเซย์รินะ",
    type: "SR",
    desc: `เมื่อจุดมวลมายาจะปรากฎขึ้น อาจเป็นสิ่งที่คุณนึกถึงชั่วขณะ ถวิลหา ไม่ว่าจะเป็นความทรงจำ สิ่งของ หรือใครสักคน แต่สิ่งที่ปรากฏ จะเป็นเพียงเศษเสี้ยวเล็ก ๆ ที่มากพอให้คุณนึกถึงเรื่องราวพวกนั้นเท่านั้น\n\nคิดถึงหรือเปล่า? \nอย่างน้อย มันก็คงอยู่เป็นเพื่อนคุณ ..จนกว่า\nแสงไฟนั้นจะดับลง`,
    quote: "",
    image: `${baseUrl}images/chibi/Shoji.png`,
    rate: 5,
  },
  {
    id: 6,
    name: "ไฟเย็นเซย์รินะ",
    type: "SSR",
    desc: `เมื่อจุดมวลมายาจะปรากฎขึ้น อาจเป็นสิ่งที่คุณนึกถึงชั่วขณะ ถวิลหา ไม่ว่าจะเป็นความทรงจำ สิ่งของ หรือใครสักคน แต่สิ่งที่ปรากฏ จะเป็นเพียงเศษเสี้ยวเล็ก ๆ ที่มากพอให้คุณนึกถึงเรื่องราวพวกนั้นเท่านั้น\n\nคิดถึงหรือเปล่า? \nอย่างน้อย มันก็คงอยู่เป็นเพื่อนคุณ ..จนกว่าแสงไฟนั้นจะดับลง`,
    quote: `กระดาษในมือเขาเขียนว่า\n\n[ อันนี้ของคุณครับ ]\n[ ขอให้สนุกกับงานนะครับ ]`,
    image: `${baseUrl}images/ssr/Shoji.png`,
    rate: 3.33,
    themeColor: "#096CFF",
    themeGrad: "#87CEFA",
  },
  {
    id: 7,
    name: "ไฟเย็นประกายเร้นเงา",
    type: "Normal",
    desc: `เมื่อจุดไฟ...\nประกายสีเงินอมม่วงสลัวจะหยาดหยดลงเป็น "ฝูงปลาเงา" แหวกว่ายอยู่รอบกาย\nคอยดูดซับความเหนื่อยล้าและขุ่นมัวในจิตใจ\n\nจนเมื่อแสงไฟมอดดับ...\nพวกมันก็จะสลายไป พร้อมนำพาทุกความรู้สึกแย่ ๆ ให้จางหายไปในความมืด\n\nลองหยุดพัก... ให้ฝูงปลาพวกนี้ช่วยเยียวยาจิตใจคุณดูสักหน่อยไหม?`,
    quote: "",
    image: `${baseUrl}images/sparkler/Shoji.png`,
    rate: 8.33,
  },
  {
    id: 8,
    name: "ไฟเย็นประกายเร้นเงา",
    type: "SR",
    desc: `เมื่อจุดไฟ...\nประกายสีเงินอมม่วงสลัวจะหยาดหยดลงเป็น "ฝูงปลาเงา" แหวกว่ายอยู่รอบกาย\nคอยดูดซับความเหนื่อยล้าและขุ่นมัวในจิตใจ\n\nจนเมื่อแสงไฟมอดดับ...\nพวกมันก็จะสลายไป พร้อมนำพาทุกความรู้สึกแย่ ๆ ให้จางหายไปในความมืด\n\nลองหยุดพัก... ให้ฝูงปลาพวกนี้ช่วยเยียวยาจิตใจคุณดูสักหน่อยไหม?`,
    quote: "",
    image: `${baseUrl}images/chibi/Shoji.png`,
    rate: 5,
  },
  {
    id: 9,
    name: "ไฟเย็นประกายเร้นเงา",
    type: "SSR",
    desc: `เมื่อจุดไฟ... ประกายสีเงินอมม่วงสลัวจะหยดลงเป็น "ฝูงปลาเงา" แหวกว่ายคอยดูดซับความเหนื่อยล้าในจิตใจ\n\nจนเมื่อแสงไฟมอดดับ... พวกมันก็จะสลายไป พร้อมนำพาทุกความรู้สึกแย่ๆ ให้จางหายไปในความมืด\n\nลองหยุดพัก... ให้ฝูงปลาพวกนี้ช่วยเยียวยาจิตใจคุณดูสักหน่อยไหม?`,
    quote: `กระดาษในมือเขาเขียนว่า\n\n[ อันนี้ของคุณครับ ]\n[ ขอให้สนุกกับงานนะครับ ]`,
    image: `${baseUrl}images/ssr/Shoji.png`,
    rate: 3.33,
    themeColor: "#096CFF",
    themeGrad: "#87CEFA",
  },
  {
    id: 10,
    name: "ไฟเย็นสึรุ",
    type: "Normal",
    desc: `ละอองแสงสีทองสว่างเป็นประกายแวววาวเมื่อถูกจุดขึ้น นอกจากนั้นก็ดูไม่ต่างจากไฟเย็นธรรมดาทั่วไป\n\nจนกระทั่งคุณลองแกว่งมันดู ก็จะปรากฏเป็นเจ้านกกระดาษล่องลอยล้อมรอบคุณ โผล่เพิ่มขึ้นมาเรื่อยๆไม่สิ้นสุดตามจำนวนที่คุณสะบัด\n\nก่อนที่จะดับลง เหล่านกกระดาษไม่ว่าจะมากน้อยได้รวมตัวกัน กลายเป็นเพียงแสงเทียนริบหรี่อยู่ปลายด้าม\n\nอยากลองอธิษฐานแล้วเป่ามันดูไหม ?`,
    quote: "",
    image: `${baseUrl}images/sparkler/Shoji.png`,
    rate: 8.33,
  },
  {
    id: 11,
    name: "ไฟเย็นสึรุ",
    type: "SR",
    desc: `ละอองแสงสีทองสว่างเป็นประกายแวววาวเมื่อถูกจุดขึ้น นอกจากนั้นก็ดูไม่ต่างจากไฟเย็นธรรมดาทั่วไป\n\nจนกระทั่งคุณลองแกว่งมันดู ก็จะปรากฏเป็นเจ้านกกระดาษล่องลอยล้อมรอบคุณ โผล่เพิ่มขึ้นมาเรื่อยๆไม่สิ้นสุดตามจำนวนที่คุณสะบัด\n\nก่อนที่จะดับลง เหล่านกกระดาษไม่ว่าจะมากน้อยได้รวมตัวกัน กลายเป็นเพียงแสงเทียนริบหรี่อยู่ปลายด้าม\n\nอยากลองอธิษฐานแล้วเป่ามันดูไหม ?`,
    quote: "",
    image: `${baseUrl}images/chibi/Shoji.png`,
    rate: 5,
  },
  {
    id: 12,
    name: "ไฟเย็นสึรุ",
    type: "SSR",
    desc: `ละอองแสงสีทองสว่างเป็นประกายแวววาวเมื่อถูกจุดขึ้น นอกจากนั้นก็ดูไม่ต่างจากไฟเย็นธรรมดาทั่วไป จนกระทั่งคุณลองแกว่งมันดู ก็จะปรากฏเป็นเจ้านกกระดาษล่องลอยล้อมรอบคุณ โผล่เพิ่มขึ้นมาเรื่อยๆไม่สิ้นสุดตามจำนวนที่คุณสะบัด\n\nก่อนที่จะดับลง เหล่านกกระดาษไม่ว่าจะมากน้อยได้รวมตัวกัน กลายเป็นเพียงแสงเทียนริบหรี่อยู่ปลายด้าม อยากลองอธิษฐานแล้วเป่ามันดูไหม ?`,
    quote: (
      <>
        “<b>เฮ้</b> เอาไปสิ”
      </>
    ),
    image: `${baseUrl}images/ssr/Shoji.png`,
    rate: 3.33,
    themeColor: "#C9EE66",
    themeGrad: "#E6C969",
  },
  {
    id: 13,
    name: "ไฟพี่ชาวี",
    type: "Normal",
    desc: `ประกายสีฟ้าสว่างขึ้นเมื่อถูกจุดไฟ มันส่องแสงพร่างพราวราวเกล็ดหิมะ ค่อย ๆ เรียงตัวกันอย่างสวยงามจนกลายเป็น… ใบหน้าของ คามิโซโนะ เท็นเง็น (?) แบบคมชัด 3 มิติขนาดเท่าจริง\n\nคุณรู้สึกได้ถึงละอองเย็น ๆ ที่โปรยลงมาสัมผัสผิวผะแผ่ว แม้จะเป็นดอกไม้ไฟที่ประหลาดสักหน่อยแต่อย่างน้อยก็ช่วยดับร้อนให้ได้บ้างล่ะนะ`,
    quote: "",
    image: `${baseUrl}images/sparkler/Shoji.png`,
    rate: 8.34,
  },
  {
    id: 14,
    name: "ไฟพี่ชาวี",
    type: "SR",
    desc: `ประกายสีฟ้าสว่างขึ้นเมื่อถูกจุดไฟ มันส่องแสงพร่างพราวราวเกล็ดหิมะ ค่อย ๆ เรียงตัวกันอย่างสวยงามจนกลายเป็น… ใบหน้าของ คามิโซโนะ เท็นเง็น (?) แบบคมชัด 3 มิติขนาดเท่าจริง\n\nคุณรู้สึกได้ถึงละอองเย็น ๆ ที่โปรยลงมาสัมผัสผิวผะแผ่ว แม้จะเป็นดอกไม้ไฟที่ประหลาดสักหน่อยแต่อย่างน้อยก็ช่วยดับร้อนให้ได้บ้างล่ะนะ`,
    quote: "",
    image: `${baseUrl}images/chibi/Shoji.png`,
    rate: 5,
  },
  {
    id: 15,
    name: "ไฟพี่ชาวี",
    type: "SSR",
    desc: `ประกายสีฟ้าสว่างขึ้นเมื่อถูกจุดไฟ มันส่องแสงพร่างพราวราวเกล็ดหิมะ ค่อย ๆ เรียงตัวกันอย่างสวยงามจนกลายเป็น… ใบหน้าของ คามิโซโนะ เท็นเง็น (?) แบบคมชัด 3 มิติขนาดเท่าจริง\n\nคุณรู้สึกได้ถึงละอองเย็น ๆ ที่โปรยลงมาสัมผัสผิวผะแผ่ว แม้จะเป็นดอกไม้ไฟที่ประหลาดสักหน่อยแต่อย่างน้อยก็ช่วยดับร้อนให้ได้บ้างล่ะนะ`,
    quote: (
      <>
        “<b>เอ้า</b> รับไฟ‘เย็น’นี่ไปสิ ความ cool ของฉันจะช่วยคลายร้อนให้เธอเอง”{" "}
        <br />
        .ขยิบตา .เสยผม
      </>
    ),
    image: `${baseUrl}images/ssr/Shoji.png`,
    rate: 3.34,
    themeColor: "#DDFFFF",
    themeGrad: "#e7fefe",
  },
  {
    id: 16,
    name: "ไฟเย็นฮิบิกิ",
    type: "Normal",
    desc: `เมื่อไฟถูกจุดขึ้น เสียงตึกตัก ตึกตักของหัวใจของคุณจะค่อย ๆ ดังขึ้นจนกลบเสียงรอบข้างของคุณ\nไม่มีเสียงอะไรนอกจากเสียงหัวใจของคุณที่ยังเต้นอยู่ แต่ความสงบนี้อยู่ได้ไม่นานหรอก\n\n...\n\nทันทีที่ไฟกำลังจะมอดดับ ประกายไฟสุดท้ายของมันจะระเบิดออกมาเป็นพลุขนาดย่อยส่องแสงสวยงาม\n(ระวังอย่าให้ระเบิดใส่หน้าล่ะ !!!)`,
    quote: "",
    image: `${baseUrl}images/sparkler/Shoji.png`,
    rate: 8.34,
  },
  {
    id: 17,
    name: "ไฟเย็นฮิบิกิ",
    type: "SR",
    desc: `เมื่อไฟถูกจุดขึ้น เสียงตึกตัก ตึกตักของหัวใจของคุณจะค่อย ๆ ดังขึ้นจนกลบเสียงรอบข้างของคุณ\nไม่มีเสียงอะไรนอกจากเสียงหัวใจของคุณที่ยังเต้นอยู่ แต่ความสงบนี้อยู่ได้ไม่นานหรอก\n\n...\n\nทันทีที่ไฟกำลังจะมอดดับ ประกายไฟสุดท้ายของมันจะระเบิดออกมาเป็นพลุขนาดย่อยส่องแสงสวยงาม\n(ระวังอย่าให้ระเบิดใส่หน้าล่ะ !!!)`,
    quote: "",
    image: `${baseUrl}images/chibi/Shoji.png`,
    rate: 5,
  },
  {
    id: 18,
    name: "ไฟเย็นฮิบิกิ",
    type: "SSR",
    desc: `เมื่อไฟถูกจุดขึ้น เสียงตึกตัก ตึกตักของหัวใจของคุณจะค่อย ๆ ดังขึ้นจนกลบเสียงรอบข้างของคุณ\nไม่มีเสียงอะไรนอกจากเสียงหัวใจของคุณที่ยังเต้นอยู่ แต่ความสงบนี้อยู่ได้ไม่นานหรอก\n...\n\nทันทีที่ไฟกำลังจะมอดดับ ประกายไฟสุดท้ายของมันจะระเบิดออกมาเป็นพลุขนาดย่อยส่องแสงสวยงาม\n(ระวังอย่าให้ระเบิดใส่หน้าล่ะ !!!)`,
    quote: `กระดาษในมือเขาเขียนว่า\n\n[ อันนี้ของคุณครับ ]\n[ ขอให้สนุกกับงานนะครับ ]`,
    image: `${baseUrl}images/ssr/Shoji.png`,
    rate: 3.34,
    themeColor: "#096CFF",
    themeGrad: "#87CEFA",
  },
];
const sparklerItemstest = [
  {
    id: 1,
    name: "ไฟเย็นกล่องไม้ไขลาน",
    type: "Normal",
    desc: `เมื่อปลายไฟเย็นถูกจุดขึ้น เสียงเพลงราวกล่องดนตรีจะค่อยบรรเลงคลอไปในบรรยากาศ มันอาจจะเป็นทำนองที่ไม่เคยคุ้น.. หรืออาจจะเป็นเพลงที่คุณเคยได้ยินมาก่อนสักครั้งหนึ่ง\n\nโอ๊ะ ดูเหมือนว่าถ้าสะบัดไปมามันจะเปลี่ยนจังหวะได้ด้วยนะ ? \nลองเล่นเป็นวาทยากรสักครั้งไหม`,
    quote: "",
    image: `${baseUrl}images/sparkler/Shoji.png`,
    rate: 50,
  },
  {
    id: 2,
    name: "ไฟเย็นกล่องไม้ไขลาน",
    type: "SR",
    desc: `เมื่อปลายไฟเย็นถูกจุดขึ้น เสียงเพลงราวกล่องดนตรีจะค่อยบรรเลงคลอไปในบรรยากาศ มันอาจจะเป็นทำนองที่ไม่เคยคุ้น.. หรืออาจจะเป็นเพลงที่คุณเคยได้ยินมาก่อนสักครั้งหนึ่ง\n\nโอ๊ะ ดูเหมือนว่าถ้าสะบัดไปมามันจะเปลี่ยนจังหวะได้ด้วยนะ ? \nลองเล่นเป็นวาทยากรสักครั้งไหม`,
    quote: "",
    image: `${baseUrl}images/chibi/Shoji.png`,
    rate: 30,
  },
  {
    id: 3,
    name: "ไฟเย็นกล่องไม้ไขลาน",
    type: "SSR",
    desc: `เมื่อปลายไฟเย็นถูกจุดขึ้น เสียงเพลงราวกล่องดนตรีจะค่อยบรรเลงคลอไปในบรรยากาศ มันอาจจะเป็นทำนองที่ไม่เคยคุ้น.. หรืออาจจะเป็นเพลงที่คุณเคยได้ยินมาก่อนสักครั้งหนึ่ง\n\nโอ๊ะ ดูเหมือนว่าถ้าสะบัดไปมามันจะเปลี่ยนจังหวะได้ด้วยนะ ?\nลองเล่นเป็นวาทยากรสักครั้งไหม`,
    quote: `กระดาษในมือเขาเขียนว่า\n\n[ อันนี้ของคุณครับ ]\n[ ขอให้สนุกกับงานนะครับ ]`,
    image: `${baseUrl}images/ssr/Shoji.png`,
    rate: 20,
    themeColor: "#096CFF",
    themeGrad: "#87CEFA",
  },
];

const sparklerList = [
  {
    id: 1,
    name: "ไฟเย็นกล่องไม้ไขลาน",
    imageNo: `${baseUrl}images/sparklerNO/Shoji.png`,
    image: `${baseUrl}images/sparkler/Shoji.png`,
  },
  {
    id: 2,
    name: "ไฟเย็นกล่องไม้ไขลาน",
    imageNo: `${baseUrl}images/sparklerNO/Shoji.png`,
    image: `${baseUrl}images/sparkler/Shoji.png`,
  },
  {
    id: 3,
    name: "ไฟเย็นกล่องไม้ไขลาน",
    imageNo: `${baseUrl}images/sparklerNO/Shoji.png`,
    image: `${baseUrl}images/sparkler/Shoji.png`,
  },
  {
    id: 4,
    name: "ไฟเย็นกล่องไม้ไขลาน",
    imageNo: `${baseUrl}images/sparklerNO/Shoji.png`,
    image: `${baseUrl}images/sparkler/Shoji.png`,
  },
  {
    id: 5,
    name: "ไฟเย็นกล่องไม้ไขลาน",
    imageNo: `${baseUrl}images/sparklerNO/Shoji.png`,
    image: `${baseUrl}images/sparkler/Shoji.png`,
  },
  {
    id: 6,
    name: "ไฟเย็นกล่องไม้ไขลาน",
    imageNo: `${baseUrl}images/sparklerNO/Shoji.png`,
    image: `${baseUrl}images/sparkler/Shoji.png`,
  },
  {
    id: 7,
    name: "ไฟเย็นกล่องไม้ไขลาน",
    imageNo: `${baseUrl}images/sparklerNO/Shoji.png`,
    image: `${baseUrl}images/sparkler/Shoji.png`,
  },
  {
    id: 8,
    name: "ไฟเย็นกล่องไม้ไขลาน",
    imageNo: `${baseUrl}images/sparklerNO/Shoji.png`,
    image: `${baseUrl}images/sparkler/Shoji.png`,
  },
  {
    id: 9,
    name: "ไฟเย็นกล่องไม้ไขลาน",
    imageNo: `${baseUrl}images/sparklerNO/Shoji.png`,
    image: `${baseUrl}images/sparkler/Shoji.png`,
  },
  {
    id: 10,
    name: "ไฟเย็นกล่องไม้ไขลาน",
    imageNo: `${baseUrl}images/sparklerNO/Shoji.png`,
    image: `${baseUrl}images/sparkler/Shoji.png`,
  },
  {
    id: 11,
    name: "ไฟเย็นกล่องไม้ไขลาน",
    imageNo: `${baseUrl}images/sparklerNO/Shoji.png`,
    image: `${baseUrl}images/sparkler/Shoji.png`,
  },
];

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState(null);
  const [showFlash, setShowFlash] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  const audioRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const canHover = useMediaQuery("(hover: hover)");

  useEffect(() => {
    audioRef.current = new Audio(`${import.meta.env.BASE_URL}song/music.mp3`);

    const playAudioOnFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.loop = true;
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            document.removeEventListener("click", playAudioOnFirstInteraction);
          })
          .catch((err) => console.log("Autoplay prevented:", err));
      }
    };

    document.addEventListener("click", playAudioOnFirstInteraction);

    return () => {
      document.removeEventListener("click", playAudioOnFirstInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.loop = true;
      audioRef.current
        .play()
        .catch((err) => console.error("Audio error:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const handleRollGacha = () => {
    setIsFlipped(false);
    setIsRolling(true);
    setOpenModal(true);
    setResult(null);
    setShowFireworks(false);

    setTimeout(() => {
      const rand = Math.random() * 100;
      let cumulativeRate = 0;
      let pulledItem = sparklerItems[0];

      for (let item of sparklerItems) {
        cumulativeRate += item.rate;
        if (rand <= cumulativeRate) {
          pulledItem = item;
          break;
        }
      }

      setResult(pulledItem);
      setIsRolling(false);

      if (pulledItem.type === "SSR") {
        setShowFireworks(true);
        setTimeout(() => {
          setShowFireworks(false);
        }, 5000);
      }
    }, 1500);
  };

  useEffect(() => {
    sparklerItems.forEach((item) => {
      const img = new Image();
      img.src = item.image;
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
    if (openModal) {
      document.body.style.overflow = "hidden"; // ล็อกไม่ให้ไถหน้าเว็บหลักได้
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto"; // คืนค่าเวลา Component Unmount
    };
  }, [openModal]);
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
          {[...Array(35)].map((_, i) => {
            const isPink = i % 2 === 0;
            const color = isPink ? "#FFB7C5" : "#E6E6FA";
            const size = Math.random() * 3 + 2;
            const duration = Math.random() * 4 + 4;
            const delay = Math.random() * 8;
            const top = `${Math.random() * 100}vh`;
            const left = `${Math.random() * 100}vw`;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0.4, 1, 0.2, 0],
                  scale: [0, 1.2, 0.8, 1.5, 0.5, 0],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  delay: delay,
                  ease: "easeInOut",
                  times: [0, 0.1, 0.3, 0.6, 0.8, 1],
                }}
                style={{
                  position: "absolute",
                  top: top,
                  left: left,
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: "#FFF",
                  borderRadius: "50%",
                  boxShadow: `
                0 0 ${size * 2}px ${color}, 
                0 0 ${size * 4}px ${color}, 
                0 0 ${size * 6}px ${color}
              `,
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
            <Typography
              variant="h2"
              sx={{
                fontFamily: "'Shippori Mincho', serif",
                fontWeight: "900",
                color: "#FFFFFF",
                textShadow:
                  "0 0 20px rgba(255, 105, 180, 0.8), 0 0 40px rgba(255, 20, 147, 0.5)",
                mb: 0.5,
                textAlign: "center",
                fontSize: { xs: "4rem", sm: "5rem", md: "6rem" },
                letterSpacing: "4px",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              夜花{" "}
              <span
                style={{
                  fontSize: "0.7em",
                  filter: "drop-shadow(0 0 10px #FFB7C5)",
                }}
              >
                🏮
              </span>
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "#FFB7C5",
                textAlign: "center",
                fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" },
                letterSpacing: { xs: "8px", md: "12px" },
                textShadow: "0 0 15px rgba(255, 183, 197, 0.6)",
                mb: 4,
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
                mb: { xs: 6, md: 8 },
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
                  fontSize: { xs: "0.65rem", sm: "0.8rem", md: "0.8rem" },
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            style={{ zIndex: 1 }}
          >
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
                  fontSize: { xs: "1.1rem", md: "1.3rem" },
                  fontWeight: "bold",
                  px: { xs: 4, md: 6 },
                  py: { xs: 1.5, md: 2 },
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
            >
              SCROLL
            </Typography>
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
                overflow: "hidden", // ป้องกันการทะลุขอบจอ
              }}
            >
              <AnimatePresence>
                {!isRolling && result?.type === "SSR" && (
                  <motion.div
                    key="ssr-bg"
                    initial={{ opacity: 0, scale: 1.3, x: "5%", y: "-5%" }}
                    animate={{ opacity: 0.25, scale: 1.4, x: "15%", y: "-5%" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 4, ease: "easeOut" }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundImage: `url(${result.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "right 20%",
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
                    {[...Array(80)].map((_, i) => {
                      const size = Math.random() * 8 + 3;
                      const angle = Math.random() * Math.PI * 2;
                      const distance = Math.random() * 70 + 30;
                      const tx = Math.cos(angle) * distance;
                      const ty = Math.sin(angle) * distance;

                      const colors = [
                        result?.themeColor || "#FF69B4",
                        result?.themeGrad || "#FFB7C5",
                        "#FFFFFF",
                        "#FFE4E1",
                      ];
                      const color =
                        colors[Math.floor(Math.random() * colors.length)];

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
                            duration: Math.random() * 1.5 + 0.5,
                            ease: "easeOut",
                          }}
                          style={{
                            position: "absolute",
                            width: size,
                            height: size,
                            borderRadius: "50%",
                            backgroundColor: color,
                            boxShadow: `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}`,
                          }}
                        />
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: "100%",
                  maxWidth: result?.type === "SSR" ? "700px" : "450px",
                  maxHeight: "100%", // ป้องกันคอนเทนต์ดันขอบบนล่างจนหลุดกึ่งกลาง
                  display: "flex", // เพิ่ม Flex ให้ Wrapper ของการ์ด
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

                      {[...Array(40)].map((_, i) => {
                        const angle = (i * 9 * Math.PI) / 180;
                        const distance = Math.random() * 70 + 40;
                        const duration = Math.random() * 0.8 + 0.4;
                        const delay = Math.random() * 1;
                        const size = Math.random() * 4 + 2;
                        const color =
                          i % 3 === 0
                            ? "#FF69B4"
                            : i % 2 === 0
                              ? "#FFB7C5"
                              : "#FFF";

                        return (
                          <motion.div
                            key={`spark-${i}`}
                            initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
                            animate={{
                              opacity: [1, 1, 0],
                              scale: [0, 1.5, 0],
                              x: Math.cos(angle) * distance,
                              y: Math.sin(angle) * distance,
                            }}
                            transition={{
                              duration: duration,
                              repeat: Infinity,
                              ease: "easeOut",
                              delay: delay,
                            }}
                            style={{
                              position: "absolute",
                              width: size,
                              height: size,
                              borderRadius: "50%",
                              backgroundColor: color,
                              boxShadow: `0 0 ${size * 2.5}px ${color}`,
                            }}
                          />
                        );
                      })}

                      <motion.div
                        animate={{ scale: [1, 1.8, 1], opacity: [0.9, 1, 0.9] }}
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
                          {[...Array(30)].map((_, i) => {
                            const size = Math.random() * 5 + 2;
                            const startX = `${Math.random() * 100}%`;
                            const driftX = (Math.random() - 0.5) * 60;
                            const duration = Math.random() * 5 + 4;
                            const delay = Math.random() * 5;
                            const color =
                              i % 2 === 0
                                ? result.themeColor || "#FF69B4"
                                : "#FFFFFF";

                            return (
                              <motion.div
                                key={`ssr-float-particle-${i}`}
                                initial={{ opacity: 0, x: 0, y: "100%" }}
                                animate={{
                                  opacity: [0, 0.8, 0.8, 0],
                                  y: ["100%", "-20%"],
                                  x: [0, driftX, driftX * 1.5],
                                }}
                                transition={{
                                  duration: duration,
                                  repeat: Infinity,
                                  delay: delay,
                                  ease: "linear",
                                }}
                                style={{
                                  position: "absolute",
                                  bottom: 0,
                                  left: startX,
                                  width: size,
                                  height: size,
                                  borderRadius: "50%",
                                  backgroundColor: color,
                                  boxShadow: `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}`,
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
                                xs: "55vh",
                                md: "calc(95vh - 200px)",
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
                            animate={!canHover && isFlipped ? "hover" : "rest"}
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
                                  [`@keyframes pulseFrameFront_${result.id}`]: {
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
                                      top: "-18px",
                                      left: "50%",
                                      transform: "translateX(-50%)",
                                      display: "inline-block",
                                      color: "#FFF",
                                      bgcolor: `${result.themeColor || "#FF69B4"}33`,
                                      fontWeight: "900",
                                      letterSpacing: 5,
                                      fontSize: "0.80rem",
                                      px: 3,
                                      py: 0.5,
                                      border: `1px solid ${result.themeColor || "#FF69B4"}CC`,
                                      borderRadius: "30px",
                                      backdropFilter: "blur(6px)",
                                      textShadow: `0 0 10px ${result.themeColor || "#FF69B4"}`,
                                      boxShadow: `0 0 15px ${result.themeColor || "#FF69B4"}80`,
                                    }}
                                  >
                                    ✦ SSR ✦
                                  </Typography>

                                  <Typography
                                    variant="body1"
                                    sx={{
                                      color: "#e0e0e0",
                                      lineHeight: { xs: 1.4, sm: 1.6 },
                                      fontSize: { xs: "0.75rem", sm: "1rem" },
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
                                      fontSize: { xs: "0.4rem", sm: "0.6rem" },
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
                                  [`@keyframes pulseFrameBack_${result.id}`]: {
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
                                      textShadow: `1px 1px 3px rgba(0, 0, 0, 0.8), 0 0 8px ${result.themeColor || "#FF69B4"}`,
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
                                      fontSize: { xs: "0.7rem", sm: "0.85rem" }, // ✨ ปรับขนาดฟอนต์บนมือถือให้พอดี
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
                                      fontSize: { xs: "0.4rem", sm: "0.6rem" },
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
                        initial={{ rotateY: 90, scale: 0.8, opacity: 0, y: 50 }}
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
                                  initial={{ opacity: 0, scale: 0, rotate: 0 }}
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
                            animate={!canHover && isFlipped ? "hover" : "rest"}
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
                                  animation: "gradient-shift 4s ease infinite",
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
                                    boxShadow: "inset 0 0 20px rgba(0,0,0,0.8)",
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
                                        letterSpacing: 5,
                                        fontSize: "0.80rem",
                                        px: 3,
                                        py: 0.5,
                                        border: `1px solid ${tagBorder}`,
                                        borderRadius: "30px",
                                        mb: 1.5,
                                        backdropFilter: "blur(6px)",
                                        textShadow: tagGlow,
                                      }}
                                    >
                                      ✦ {result.type} ✦
                                    </Typography>
                                    <Typography
                                      variant="h4"
                                      sx={{
                                        fontWeight: "bold",
                                        fontSize: { xs: "1rem", sm: "1.8rem" },
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
                                        textShadow: "0 2px 4px rgba(0,0,0,0.5)",
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
                                      fontSize: { xs: "0.4rem", sm: "0.6rem" },
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
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showFlash && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "white",
                zIndex: 999999,
              }}
            />
          )}
        </AnimatePresence>
      </Box>
    </ThemeProvider>
  );
}
