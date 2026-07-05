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
import confetti from "canvas-confetti";
const baseUrl = import.meta.env.BASE_URL;

const sparklerItems = [
  {
    id: 1,
    name: "ไฟเย็นเกลียวคลื่นฉลาม",
    type: "Normal",
    desc: "ประกายสีน้ำทะเลลึกลับ แฝงความซุกซนและร่าเริง เปล่งประกายราวกับหางปลาที่แหวกว่ายในยามค่ำคืน",
    image: `${baseUrl}images/sparkler2.png`,
    rate: 45,
  },
  {
    id: 2,
    name: "ไฟเย็นบทบรรเลงอำลา",
    type: "Normal",
    desc: "แสงสีชมพูสลัวที่งดงาม สะท้อนความรู้สึกที่ซ่อนเร้น ความผูกพันที่ลึกซึ้งจนไม่อยากเอ่ยคำลา",
    image: `${baseUrl}images/sparkler1.jpg`,
    rate: 45,
  },
  {
    id: 3,
    name: "ไฟเย็นแปดดาบแห่งโชคชะตา",
    type: "SSR",
    desc: "แสงสีแดงทองที่สาดส่อง ท่ามกลางความขัดแย้งในใจ แม้กลัวการสูญเสีย แต่แสงนี้จะช่วยปลดเปลื้องพันธนาการให้ก้าวเดิน",
    image: `${baseUrl}images/kyora.png`,
    rate: 7,
  },
  {
    id: 4,
    name: "ไฟเย็นไออุ่นผู้พิทักษ์",
    type: "SSR",
    desc: "แสงสว่างที่อบอุ่นที่สุด คอยดูแลอุณหภูมิและจัดแจงชุดยูกาตะให้เข้าที่ ปกป้องคุณจากความเหน็บหนาวอย่างเงียบเชียบ",
    image: `${baseUrl}images/kyora.png`,
    rate: 3,
  },
];

export default function MagicSparklerBooth() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState(null);
  const [showFlash, setShowFlash] = useState(false);
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
        try {
          confetti({
            particleCount: 250,
            spread: 120,
            origin: { y: 0.6 },
            colors: ["#FFD700", "#FF69B4", "#FF4500", "#8A2BE2"],
            zIndex: 99999,
          });
        } catch (err) {
          console.error("Confetti Error:", err);
        }
      }
    }, 1500);
  };

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
            onClick={() => !isRolling && setOpenModal(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(5, 5, 16, 0.9)",
              backdropFilter: "blur(10px)",
              zIndex: 9999,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
              boxSizing: "border-box",
            }}
          >
            {/* 💡 จุดที่ปรับแก้ 💡 : ให้ Wrapper หลักปรับขนาดความกว้างตามประเภทของผลลัพธ์ */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{ 
                width: "100%", 
                maxWidth: result?.type === "SSR" ? "700px" : "450px", 
                transition: "max-width 0.3s ease-in-out" 
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
                        maxWidth: "700px", // 💡 ปรับความกว้างสูงสุดของ SSR เป็น 700px 💡
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
                            maxWidth: "500px", // จำกัดขนาดรูปภาพไม่ให้ใหญ่เทอะทะเกินไป
                            height: { xs: "50vh", md: "65vh" }, 
                            objectFit: "contain",
                            filter: "drop-shadow(0px 0px 5px rgba(255, 182, 193, 0.6))",
                          }}
                        />
                      </div>

                      {/* กล่องข้อความ SSR พลิกได้ */}
                      <Box
                        sx={{
                          perspective: 1000,
                          width: "100%", // จะขยายเต็ม 700px ตามตัว Wrapper แม่ 
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
                                background:
                                  "linear-gradient(135deg, #FFD700, #FF4500, #FFD700, #FF8C00)",
                                backgroundSize: "300% 300%",
                                boxShadow: "0 10px 40px rgba(255, 215, 0, 0.4)",
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
                                    bgcolor: "rgba(255, 215, 0, 0.2)",
                                    fontWeight: "900",
                                    letterSpacing: 5,
                                    fontSize: "0.85rem",
                                    px: 3,
                                    py: 0.5,
                                    border: "1px solid rgba(255,215,0,0.8)",
                                    borderRadius: "30px",
                                    backdropFilter: "blur(6px)",
                                    textShadow: "0 0 10px #FFD700",
                                    boxShadow: "0 0 15px rgba(255,215,0,0.5)",
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
                                    fontSize: { xs: "1.1rem", sm: "2.2rem" },
                                  }}
                                >
                                  "{result.quote || "รับไปสิ ยืนบื้ออะไรอยู่"}"
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
                                background:
                                  "linear-gradient(135deg, #FFD700, #FF4500, #FFD700, #FF8C00)",
                                backgroundSize: "300% 300%",
                                boxShadow: "0 10px 40px rgba(255, 215, 0, 0.4)",
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
                                    background:
                                      "-webkit-linear-gradient(0deg, #FFF, #FFD700, #FFA500)",
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
                                    color: "#FFD700",
                                    borderColor: "rgba(255,215,0,0.6)",
                                    borderRadius: "30px",
                                    py: 1.2,
                                    fontSize: "1rem",
                                    fontWeight: "bold",
                                    backdropFilter: "blur(5px)",
                                    background: "rgba(0, 0, 0, 0.3)",
                                    transition: "all 0.3s",
                                    "&:hover": {
                                      bgcolor: "rgba(255,215,0,0.2)",
                                      borderColor: "#FFD700",
                                      boxShadow: "0 0 20px rgba(255,215,0,0.6)",
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
                    // แบบปกติ (Normal)
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
                        maxWidth: "450px", // ระดับปกติคงความกว้างที่ 450px ไว้เหมือนเดิม
                        perspective: 1000,
                      }}
                    >
                      <motion.div
                        animate={{ y: [-5, 5, -5] }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
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
                            {/* === หน้าการ์ด: แสดงรูปและชื่อ === */}
                            <Box
                              sx={{
                                backfaceVisibility: "hidden",
                                position: "relative",
                                padding: "3px",
                                borderRadius: "24px",
                                background:
                                  "linear-gradient(135deg, #8A2BE2, #FF69B4, #4B0082, #FF1493)",
                                backgroundSize: "300% 300%",
                                boxShadow: "0 0 35px rgba(255, 105, 180, 0.5)",
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
                                    height: "100%",
                                    objectFit: "cover",
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
                                      "linear-gradient(to bottom, rgba(10, 5, 20, 0) 40%, rgba(10, 5, 20, 0.9) 100%)",
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
                                      bgcolor: "rgba(255, 105, 180, 0.2)",
                                      fontWeight: "900",
                                      letterSpacing: 5,
                                      fontSize: "0.85rem",
                                      px: 3,
                                      py: 0.5,
                                      border: "1px solid rgba(255,105,180,0.8)",
                                      borderRadius: "30px",
                                      mb: 2,
                                      backdropFilter: "blur(6px)",
                                      textShadow: "0 0 10px #FF69B4",
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
                                      background:
                                        "-webkit-linear-gradient(0deg, #FFF, #FFB6C1, #FF69B4)",
                                      WebkitBackgroundClip: "text",
                                      WebkitTextFillColor: "transparent",
                                      textShadow:
                                        "0px 2px 10px rgba(0,0,0,0.8)",
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
                                background:
                                  "linear-gradient(135deg, #8A2BE2, #FF69B4, #4B0082, #FF1493)",
                                backgroundSize: "300% 300%",
                                boxShadow: "0 0 35px rgba(255, 105, 180, 0.5)",
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
                                  }}
                                >
                                  "{result.desc}"
                                </Typography>
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation(); 
                                    setOpenModal(false);
                                  }}
                                  variant="outlined"
                                  fullWidth
                                  sx={{
                                    color: "#FFB6C1",
                                    borderColor: "rgba(255,105,180,0.6)",
                                    borderRadius: "30px",
                                    py: 1.2,
                                    fontSize: "1rem",
                                    fontWeight: "bold",
                                    backdropFilter: "blur(5px)",
                                    background: "rgba(0, 0, 0, 0.3)",
                                    transition: "all 0.3s",
                                    "&:hover": {
                                      bgcolor: "rgba(255,105,180,0.2)",
                                      borderColor: "#FF69B4",
                                      boxShadow:
                                        "0 0 20px rgba(255,105,180,0.6)",
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