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
import { Fireworks } from "@fireworks-js/react";
const baseUrl = import.meta.env.BASE_URL;

const sparklerItems = [
  {
    id: 1,
    name: "ไฟเย็นกล่องไม้ไขลาน",
    type: "Normal",
    desc: `เมื่อปลายไฟเย็นถูกจุดขึ้น เสียงเพลงราวกล่องดนตรีจะค่อยบรรเลงคลอไปในบรรยากาศ มันอาจจะเป็นทำนองที่ไม่เคยคุ้น.. หรืออาจจะเป็นเพลงที่คุณเคยได้ยินมาก่อนสักครั้งหนึ่ง
    ​\nโอ๊ะ ดูเหมือนว่าถ้าสะบัดไปมามันจะเปลี่ยนจังหวะได้ด้วยนะ ? ​\nลองเล่นเป็นวาทยากรสักครั้งไหม`,
    quote: "",
    image: `${baseUrl}images/sparkler/Shoji.png`,
    rate: 50,
  },
  {
    id: 2,
    name: "ไฟเย็นกล่องไม้ไขลาน",
    type: "SR",
    desc: `เมื่อปลายไฟเย็นถูกจุดขึ้น เสียงเพลงราวกล่องดนตรีจะค่อยบรรเลงคลอไปในบรรยากาศ มันอาจจะเป็นทำนองที่ไม่เคยคุ้น.. หรืออาจจะเป็นเพลงที่คุณเคยได้ยินมาก่อนสักครั้งหนึ่ง
    ​\nโอ๊ะ ดูเหมือนว่าถ้าสะบัดไปมามันจะเปลี่ยนจังหวะได้ด้วยนะ ? ​\nลองเล่นเป็นวาทยากรสักครั้งไหม`,
    quote: "",
    image: `${baseUrl}images/chibi/Shoji.png`,
    rate: 30,
  },
  {
    id: 3,
    name: "ไฟเย็นกล่องไม้ไขลาน",
    type: "SSR", // 💡 ปรับแก้ไขจาก "SR" เป็น "SSR" เพื่อให้เงื่อนไขดรอปการ์ดระดับสูงสุดทำงาน
    desc: `เมื่อปลายไฟเย็นถูกจุดขึ้น เสียงเพลงราวกล่องดนตรีจะค่อยบรรเลงคลอไปในบรรยากาศ มันอาจจะเป็นทำนองที่ไม่เคยคุ้น.. หรืออาจจะเป็นเพลงที่คุณเคยได้ยินมาก่อนสักครั้งหนึ่ง
    ​\nโอ๊ะ ดูเหมือนว่าถ้าสะบัดไปมามันจะเปลี่ยนจังหวะได้ด้วยนะ ?​\nลองเล่นเป็นวาทยากรสักครั้งไหม`,
    quote: `[ อันนี้ของคุณครับ ]​\n[ ขอให้สนุกกับงานนะครับ ]​`,
    image: `${baseUrl}images/ssr/Shoji.png`,
    rate: 20,
    themeColor: "#096CFF", 
    themeGrad: "#87CEFA",
  },
];

export default function MagicSparklerBooth() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState(null);
  const [showFlash, setShowFlash] = useState(false);

  // เพิ่ม State สำหรับควบคุมพลุ
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
    setShowFireworks(false); // รีเซ็ตพลุก่อนเปิดใหม่

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
        setShowFlash(true);
        setTimeout(() => setShowFlash(false), 500);

        // สั่งเปิดพลุ
        setShowFireworks(true);

        // ตั้งเวลาปิดพลุ (เช่น 3 วินาที)
        setTimeout(() => {
          setShowFireworks(false);
        }, 5000);
      }
    }, 1500);
  };

  const isSR = result?.type === "SR";
  const cardBorderGradient = isSR
    ? "linear-gradient(135deg, #8A2BE2, #FF69B4, #4B0082, #FF1493)"  
    : "linear-gradient(135deg, #707070, #999999, #BCBCBC, #E0E0E0)";  

  const cardGlow = isSR
    ? "0 0 35px rgba(255, 105, 180, 0.6)" // ออร่า SR สว่างกว่า
    : "0 0 10px rgba(128, 128, 128, 0.2)"; // ออร่า Normal จางๆ เบาๆ ไม่ฟุ้งมาก

  const tagBg = isSR ? "rgba(255, 105, 180, 0.2)" : "rgba(128, 128, 128, 0.15)";
  const tagBorder = isSR ? "rgba(255,105,180,0.8)" : "rgba(128,128,128,0.5)";
  const tagGlow = isSR ? "0 0 10px #FF69B4" : "0 0 5px #999999";

  const nameGradient = isSR
    ? "-webkit-linear-gradient(0deg, #FFF, #FFB6C1, #FF69B4)"
    : "-webkit-linear-gradient(0deg, #FFF, #E0E0E0, #A9A9A9)";  

  const btnColor = isSR ? "#FFB6C1" : "#A9A9A9";  
  return (
    <Box
      sx={{
        height: "100dvh",
        width: "100vw",
        bgcolor: "#050510",
        color: "#fff",
        backgroundImage:
          "radial-gradient(circle at 50% 30%, #2a1538 0%, #050510 70%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        px: 2,
        boxSizing: "border-box",
      }}
    >
      {[...Array(35)].map((_, i) => {
        const isGold = i % 2 === 0;
        const color = isGold ? "#FFD700" : "#FF69B4";
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
              zIndex: 0,
            }}
          />
        );
      })}

      <IconButton
        onClick={toggleMusic}
        sx={{
          position: "absolute",
          top: { xs: 15, md: 30 },
          right: { xs: 15, md: 30 },
          color: "#FFD700",
          bgcolor: "rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,215,0,0.3)",
          backdropFilter: "blur(5px)",
          zIndex: 10,
          "&:hover": { bgcolor: "rgba(255,215,0,0.2)" },
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
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: "serif",
              fontWeight: "900",
              textShadow: "0 0 20px #FF4500, 0 0 40px #FF69B4",
              mb: 1,
              textAlign: "center",
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
              letterSpacing: "2px",
            }}
          >
            花火の秘密 🏮
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "serif",
              color: "#FFD700",
              textAlign: "center",
              mb: 3,
              fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
              textShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
            }}
          >
            Hanabi no Himitsu
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "#e0e0e0",
              textAlign: "center",
              maxWidth: 500,
              mb: { xs: 6, md: 8 },
              px: 2,
              fontSize: { xs: "0.9rem", md: "1.1rem" },
              lineHeight: 1.8,
            }}
          >
            บูธไฟเย็นเวทมนตร์ในเทศกาลฤดูร้อน... <br />
            แสงสว่างเล็กๆ นี้อาจสะท้อนความรู้สึกที่คุณซ่อนไว้ในใจ <br />
            มาลองจุดไฟเย็นประจำตัวคุณกันเถอะ
          </Typography>
        </motion.div>

        <motion.div
          whileHover={{
            scale: 1.05,
            textShadow: "0px 0px 8px rgb(255,255,255)",
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0 0 20px #FF4500",
              "0 0 40px #FFD700",
              "0 0 20px #FF4500",
            ],
          }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ borderRadius: "50px" }}
        >
          <motion.div
            animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "50px",
              border: "2px solid #FFD700",
              zIndex: 0,
            }}
          />
          <Button
            variant="contained"
            onClick={handleRollGacha}
            sx={{
              bgcolor: "transparent",
              border: "2px solid #FFD700",
              color: "#FFD700",
              fontSize: { xs: "1.2rem", md: "1.5rem" },
              fontWeight: "bold",
              px: { xs: 5, md: 8 },
              py: { xs: 1.5, md: 2 },
              borderRadius: "50px",
              background:
                "linear-gradient(45deg, rgba(255,69,0,0.3) 0%, rgba(255,215,0,0.3) 100%)",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "rgba(255,215,0,0.2)",
                border: "2px solid #FFF",
                color: "#FFF",
              },
            }}
          >
            ✨ อธิษฐานขอไฟเย็น ✨
          </Button>
        </motion.div>
      </Box>

      {/* Overlay Modal */}
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
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(5, 5, 16, 0.8)", // พื้นหลังสีดำอมม่วง
              backdropFilter: "blur(12px)", // เบลอฉากหลังของเว็บ
              zIndex: 9999,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
              boxSizing: "border-box",
              overflow: "hidden", // ป้องกันภาพซูมทะลุขอบ
            }}
          >
            <AnimatePresence>
              {!isRolling && result?.type === "SSR" && (
                <motion.div
                  key="ssr-bg"
                  initial={{ opacity: 0, scale: 1.3, x: "5%", y: "-5%" }}
                  animate={{ opacity: 0.3, scale: 1.4, x: "15%", y: "-5%" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 4, ease: "easeOut" }} // ขยับช้าๆ ให้ดูลึกลับและละมุน
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }} // 👈 สั่งให้ opacity ค่อยๆ เป็น 0 ตอนหายไป
                  transition={{ duration: 1.5, ease: "easeInOut" }} // 👈 ใช้เวลาเฟดออก 1.5 วินาที
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 0,
                    pointerEvents: "none", // ป้องกันการคลิกโดนพลุ
                  }}
                >
                  <Fireworks
                    options={{
                      rocketsPoint: { min: 0, max: 100 },
                      hue: { min: 0, max: 360 },
                      delay: { min: 30, max: 60 },
                      speed: 2,
                      acceleration: 1.05,
                      friction: 0.95,
                      gravity: 1.5,
                      particles: 90,
                      traceLength: 3,
                      traceSpeed: 10,
                      explosion: 5,
                      intensity: 30,
                      flickering: 50,
                      lineStyle: "round",
                    }}
                    style={{
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: result?.type === "SSR" ? "700px" : "450px",
                transition: "max-width 0.3s ease-in-out",
                zIndex: 10, // ให้อยู่เหนือพลุ
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
                      animate={{ scale: [0.8, 1.5, 0.8], rotate: [0, 90, 180] }}
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
                            ? "#FFD700"
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
                          0 0 30px 10px rgba(255, 215, 0, 0.8), 
                          0 0 60px 30px rgba(255, 105, 180, 0.5)
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
                    perspective: 1000,
                  }}
                >
                  {result.type === "SSR" ? (
                    // ==========================================
                    // แบบ SSR
                    // ========================================== 
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
                        maxWidth: "700px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      {/* ภาพ SSR */}
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
                              "https://via.placeholder.com/500x650/transparent/FFD700?text=Image";
                          }}
                          sx={{
                            width: "100%",
                            maxWidth: "500px",
                            height: { xs: "50vh", md: "65vh" },
                            objectFit: "contain",
                            filter: `drop-shadow(0px 0px 5px ${result.themeColor || "#FFD700"}99)`, // 💡 เงาภาพตามสีธีม
                          }}
                        />
                      </div>

                      {/* กล่องข้อความ SSR พลิกได้ */}
                      <Box
                        sx={{
                          perspective: 1000,
                          width: "100%",
                          mt: -2,
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
                              position: "relative",
                            }}
                          >
                            {/* === ด้านหน้า: แสดงคำพูดตัวละคร === */}
                            <Box
                              sx={{
                                backfaceVisibility: "hidden",
                                position: "relative",
                                width: "100%",
                                padding: "3px",
                                borderRadius: "16px",
                                // 💡 เปลี่ยนสีกรอบเป็นสีธีม
                                background: `linear-gradient(135deg, ${result.themeColor || "#FFD700"}, ${result.themeGrad || "#FF4500"}, ${result.themeColor || "#FFD700"}, #FFF)`,
                                backgroundSize: "300% 300%",
                                boxShadow: `0 10px 40px ${result.themeColor || "#FFD700"}66`, // 66 = Opacity 40%
                                animation: "gradient-shift 4s ease infinite",
                              }}
                            >
                              <Box
                                sx={{
                                  width: "100%",
                                  height: "100%",
                                  bgcolor: "rgba(10, 5, 20, 0.95)",
                                  borderRadius: "13px",
                                  p: { xs: 3, sm: 4 },
                                  textAlign: "center",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  minHeight: "220px",
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
                                    bgcolor: `${result.themeColor || "#FFD700"}33`, // 33 = Opacity 20%
                                    fontWeight: "900",
                                    letterSpacing: 5,
                                    fontSize: "0.85rem",
                                    px: 3,
                                    py: 0.5,
                                    border: `1px solid ${result.themeColor || "#FFD700"}CC`, // CC = Opacity 80%
                                    borderRadius: "30px",
                                    backdropFilter: "blur(6px)",
                                    textShadow: `0 0 10px ${result.themeColor || "#FFD700"}`,
                                    boxShadow: `0 0 15px ${result.themeColor || "#FFD700"}80`, // 80 = Opacity 50%
                                  }}
                                >
                                  ✦ SSR ✦
                                </Typography>
                                <Typography
                                  variant="body1"
                                  sx={{
                                    color: "#e0e0e0",
                                    fontStyle: "italic",
                                    lineHeight: 1.6,
                                    fontSize: { xs: "1rem", sm: "1.5rem" },
                                    whiteSpace: "pre-line",
                                  }}
                                >
                                  {result.quote }
                                </Typography>
                              </Box>
                            </Box>

                            {/* === ด้านหลัง: แสดงคำอธิบายและปุ่มกด === */}
                            <Box
                              sx={{
                                backfaceVisibility: "hidden",
                                transform: "rotateY(180deg)",
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                padding: "3px",
                                borderRadius: "16px",
                                // 💡 เปลี่ยนสีกรอบเป็นสีธีม
                                background: `linear-gradient(135deg, ${result.themeColor || "#FFD700"}, ${result.themeGrad || "#FF4500"}, ${result.themeColor || "#FFD700"}, #FFF)`,
                                backgroundSize: "300% 300%",
                                boxShadow: `0 10px 40px ${result.themeColor || "#FFD700"}66`,
                              }}
                            >
                              <Box
                                sx={{
                                  width: "100%",
                                  height: "100%",
                                  bgcolor: "rgba(10, 5, 20, 0.95)",
                                  borderRadius: "13px",
                                  p: { xs: 3, sm: 4 },
                                  textAlign: "center",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Typography
                                  variant="h4"
                                  sx={{
                                    mt: 1,
                                    mb: 1.5,
                                    fontWeight: "bold",
                                    fontFamily: "serif",
                                    fontSize: { xs: "1.6rem", sm: "2.2rem" },
                                    background: `-webkit-linear-gradient(0deg, #FFF, ${result.themeColor || "#FFD700"}, ${result.themeGrad || "#FFA500"})`,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    textShadow: "0px 2px 10px rgba(0,0,0,0.8)",
                                  }}
                                >
                                  {result.name}
                                </Typography>
                                <Typography
                                  variant="body1"
                                  sx={{
                                    color: "#e0e0e0",
                                    lineHeight: 1.6,
                                    fontSize: { xs: "0.95rem", sm: "1.05rem" },
                                    mb: 3,
                                    whiteSpace: "pre-line",
                                  }}
                                >
                                  {result.desc}
                                </Typography>
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenModal(false);
                                  }}
                                  variant="outlined"
                                  fullWidth
                                  sx={{
                                    color: result.themeColor || "#FFD700",
                                    borderColor: `${result.themeColor || "#FFD700"}99`, // 99 = Opacity 60%
                                    borderRadius: "30px",
                                    py: 1.2,
                                    fontSize: "1rem",
                                    fontWeight: "bold",
                                    backdropFilter: "blur(5px)",
                                    background: "rgba(0, 0, 0, 0.3)",
                                    transition: "all 0.3s",
                                    "&:hover": {
                                      bgcolor: `${result.themeColor || "#FFD700"}33`,
                                      borderColor: result.themeColor || "#FFD700",
                                      boxShadow: `0 0 20px ${result.themeColor || "#FFD700"}99`,
                                      transform: "translateY(-2px)",
                                    },
                                  }}
                                >
                                  เก็บรักษาแสงสว่างนี้ไว้
                                </Button>
                              </Box>
                            </Box>
                          </motion.div>
                        </motion.div>
                      </Box>
                    </motion.div>
                  ) : (
                    // ==========================================
                    // แบบปกติ (Normal / SR)
                    // ==========================================
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
                      {/* 🌟 เพิ่มเอฟเฟกต์ Sparkle รอบการ์ดเฉพาะ SR 🌟 */}
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
                            const size = Math.random() * 15 + 10; // ขนาดของประกายแสง
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
                                  // สร้างรูปทรงประกายแสง 4 แฉก
                                  clipPath:
                                    "polygon(50% 0%, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0% 50%, 40% 40%)",
                                  boxShadow: "0 0 15px #FF69B4, 0 0 30px #FF1493",
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
                              position: "relative",
                            }}
                          >
                            {/* === หน้าการ์ด: แสดงรูปและชื่อ === */}
                            <Box
                              sx={{
                                backfaceVisibility: "hidden",
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
                                  height: { xs: "500px", sm: "600px" },
                                  bgcolor: "#0a0510",
                                  color: "white",
                                  borderRadius: "21px",
                                  display: "flex",
                                  flexDirection: "column",
                                  overflow: "hidden",
                                  boxShadow: "inset 0 0 20px rgba(0,0,0,0.8)",
                                }}
                              >
                                <Box
                                  component="img"
                                  src={result.image}
                                  alt={result.name}
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                      "https://via.placeholder.com/450x650/1a1025/FFD700?text=Sparkler+Image";
                                  }}
                                  sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "calc(100% - 120px)",
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
                                      "linear-gradient(to bottom, rgba(10, 5, 20, 0) 60%, rgba(10, 5, 20, 0.95) 100%)",
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
                                    p: { xs: 3, sm: 4 },
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
                                      fontSize: "0.85rem",
                                      px: 3,
                                      py: 0.5,
                                      border: `1px solid ${tagBorder}`,
                                      borderRadius: "30px",
                                      mb: 2,
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
                                      fontFamily: "serif",
                                      fontSize: { xs: "1.6rem", sm: "2.2rem" },
                                      background: nameGradient,
                                      WebkitBackgroundClip: "text",
                                      WebkitTextFillColor: "transparent",
                                      textShadow: "0px 2px 10px rgba(0,0,0,0.8)",
                                    }}
                                  >
                                    {result.name}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Box>

                            {/* === หลังการ์ด: แสดงคำอธิบายและปุ่มกด === */}
                            <Box
                              sx={{
                                backfaceVisibility: "hidden",
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
                                  bgcolor: "rgba(10, 5, 20, 0.95)",
                                  color: "white",
                                  borderRadius: "21px",
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  p: { xs: 3, sm: 4 },
                                }}
                              >
                                <Typography
                                  variant="body1"
                                  sx={{
                                    color: "#e0e0e0",
                                    fontStyle: "italic",
                                    lineHeight: 1.6,
                                    fontSize: { xs: "0.95rem", sm: "1.1rem" },
                                    textAlign: "center",
                                    mb: 4,
                                    whiteSpace: "pre-line",
                                  }}
                                >
                                  {result.desc}
                                </Typography>
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenModal(false);
                                  }}
                                  variant="outlined"
                                  fullWidth
                                  sx={{
                                    color: btnColor,
                                    borderColor: tagBorder,
                                    borderRadius: "30px",
                                    py: 1.2,
                                    fontSize: "1rem",
                                    fontWeight: "bold",
                                    backdropFilter: "blur(5px)",
                                    background: "rgba(0, 0, 0, 0.3)",
                                    transition: "all 0.3s",
                                    "&:hover": {
                                      bgcolor: tagBg,
                                      borderColor: btnColor,
                                      boxShadow: `0 0 20px ${tagBorder}`,
                                      transform: "translateY(-2px)",
                                    },
                                  }}
                                >
                                  เก็บรักษาแสงสว่างนี้ไว้
                                </Button>
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
  );
}
