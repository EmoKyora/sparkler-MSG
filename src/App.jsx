import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import confetti from "canvas-confetti";

const sparklerItems = [
  {
    id: 1,
    name: "ไฟเย็นเกลียวคลื่นฉลาม",
    type: "Normal",
    desc: "ประกายสีน้ำทะเลลึกลับ แฝงความซุกซนและร่าเริง เปล่งประกายราวกับหางปลาที่แหวกว่ายในยามค่ำคืน",
    image: "/images/sparkler2.png",
    rate: 45,
  },
  {
    id: 2,
    name: "ไฟเย็นบทบรรเลงอำลา",
    type: "Normal",
    desc: "แสงสีชมพูสลัวที่งดงาม สะท้อนความรู้สึกที่ซ่อนเร้น ความผูกพันที่ลึกซึ้งจนไม่อยากเอ่ยคำลา",
    image: "/images/sparkler1.jpg",
    rate: 45,
  },
  {
    id: 3,
    name: "ไฟเย็นแปดดาบแห่งโชคชะตา",
    type: "SSR",
    desc: "แสงสีแดงทองที่สาดส่อง ท่ามกลางความขัดแย้งในใจ แม้กลัวการสูญเสีย แต่แสงนี้จะช่วยปลดเปลื้องพันธนาการให้ก้าวเดิน",
    image: "/images/sparkler3.jpg",
    rate: 7,
  },
  {
    id: 4,
    name: "ไฟเย็นไออุ่นผู้พิทักษ์",
    type: "SSR",
    desc: "แสงสว่างที่อบอุ่นที่สุด คอยดูแลอุณหภูมิและจัดแจงชุดยูกาตะให้เข้าที่ ปกป้องคุณจากความเหน็บหนาวอย่างเงียบเชียบ",
    image: "/images/sparkler4.jpg",
    rate: 3,
  },
];

export default function MagicSparklerBooth() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState(null);

  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("https://youtu.be/yjDHgRgVLuw?si=sMmYxYFaJYd9UeYx");
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.loop = true;
      audioRef.current.play().catch((err) => console.error("Audio error:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const handleRollGacha = () => {
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
    }, 3500); 
  };

  return (
    <Box
      sx={{
        height: "100dvh",
        width: "100vw",
        bgcolor: "#050510",
        color: "#fff",
        // กลับมาใช้สีพื้นหลังโทนม่วงออริจินัล
        backgroundImage: "radial-gradient(circle at 50% 30%, #2a1538 0%, #050510 70%)",
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
      {/* Animated Sparkler Background Particles (โทนสีชมพู-ทอง แบบดั้งเดิม) */}
      {[...Array(40)].map((_, i) => {
        const size = Math.random() * 3 + 1;
        const isGold = i % 2 === 0;
        return (
          <motion.div
            key={i}
            initial={{
              y: "-10vh",
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              opacity: 0,
            }}
            animate={{
              y: "110vh",
              x: `calc(${Math.random() * 100 - 50}px + ${Math.random() * 100}vw)`,
              opacity: [0, 1, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
            style={{
              position: "absolute",
              width: `${size}px`,
              height: `${size * 3}px`, 
              backgroundColor: isGold ? "#FFD700" : "#FF69B4", // ทองสลับชมพู
              borderRadius: "50%",
              boxShadow: `0 0 ${size * 4}px ${isGold ? "#FFD700" : "#FF69B4"}`,
              filter: "blur(0.5px)",
              zIndex: 0,
            }}
          />
        );
      })}

      {/* Music Button */}
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
          "&:hover": { bgcolor: "rgba(255,215,0,0.2)" }
        }}
      >
        {isPlaying ? <MusicNoteIcon fontSize="large" /> : <MusicOffIcon fontSize="large" />}
      </IconButton>
      
      <Box sx={{ zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
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
              // กลับมาใช้แสงเงาสีส้ม-ชมพู แบบออริจินัล
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
          whileHover={{ scale: 1.05, textShadow: "0px 0px 8px rgb(255,255,255)" }}
          whileTap={{ scale: 0.95 }}
          animate={{ boxShadow: ["0 0 20px #FF4500", "0 0 40px #FFD700", "0 0 20px #FF4500"] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ borderRadius: "50px" }}
        >
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
              background: "linear-gradient(45deg, rgba(255,69,0,0.3) 0%, rgba(255,215,0,0.3) 100%)",
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
              backgroundColor: "rgba(5, 5, 16, 0.9)", // สีพื้นหลัง Overlay ออริจินัล
              backdropFilter: "blur(10px)",
              zIndex: 9999,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
              boxSizing: "border-box"
            }}
          >
            <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: "450px" }}>
              
              {/* อนิเมชั่นกำลังสุ่ม (Rolling) */}
              {isRolling && (
                <motion.div
                  key="rolling"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                  <Box sx={{ position: 'relative', width: 150, height: 150, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {/* วงแหวนเวทมนตร์หมุน */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        border: '2px dashed rgba(255, 105, 180, 0.5)', // เปลี่ยนสีวงแหวนให้เข้ากับธีมชมพู
                        borderRadius: '50%',
                      }}
                    />
                    {/* สะเก็ดไฟกระจาย (สีทอง/ชมพู/ส้ม) */}
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={`spark-${i}`}
                        initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
                        animate={{
                          opacity: [1, 0.8, 0],
                          scale: [0, 1.5, 0],
                          x: Math.cos((i * 18 * Math.PI) / 180) * (Math.random() * 60 + 40),
                          y: Math.sin((i * 18 * Math.PI) / 180) * (Math.random() * 60 + 40),
                        }}
                        transition={{
                          duration: 0.5 + Math.random() * 0.5,
                          repeat: Infinity,
                          ease: "easeOut",
                          delay: Math.random() * 0.3,
                        }}
                        style={{
                          position: 'absolute',
                          width: 5, height: 5,
                          borderRadius: '50%',
                          backgroundColor: i % 3 === 0 ? '#FF69B4' : (i % 2 === 0 ? '#FFD700' : '#FF4500'),
                          boxShadow: `0 0 15px 2px ${i % 3 === 0 ? '#FF69B4' : '#FFD700'}`
                        }}
                      />
                    ))}
                    {/* แกนกลางไฟสว่างวาบ */}
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                      style={{
                        width: 24, height: 24,
                        borderRadius: '50%',
                        backgroundColor: '#FFF',
                        boxShadow: '0 0 40px 20px rgba(255, 105, 180, 0.8)'
                      }}
                    />
                  </Box>
                  <Typography 
                    variant="h6" 
                    sx={{ mt: 4, color: "#FFD700", letterSpacing: 3, textShadow: "0 0 15px rgba(255, 105, 180, 0.8)" }}
                  >
                    กำลังจุดประกายไฟ...
                  </Typography>
                </motion.div>
              )}

              {/* แสดงผลลัพธ์การ์ด */}
              {!isRolling && result && (
                <motion.div
                  key="result"
                  initial={{ scale: 0.8, opacity: 0, y: 50 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ type: "spring", damping: 15, stiffness: 100 }}
                  style={{ width: "100%" }}
                >
                  {/* กรอบไล่สี (Gradient Border Wrapper) */}
                  <Box
                    sx={{
                      padding: "3px", // ความหนาของกรอบ
                      borderRadius: "20px",
                      // ระดับ Normal ใช้ธีมม่วง-ชมพู ส่วน SSR ใช้สีทอง
                      background: result.type === "SSR"
                        ? "linear-gradient(135deg, #FFD700, #FF4500, #FFD700)"
                        : "linear-gradient(135deg, #8A2BE2, #FF69B4, #8A2BE2)",
                      boxShadow: result.type === "SSR"
                        ? "0 0 40px rgba(255, 215, 0, 0.5)"
                        : "0 0 25px rgba(255, 105, 180, 0.4)",
                      animation: "gradient-shift 3s ease infinite",
                    }}
                  >
                    <Card
                      sx={{
                        width: "100%",
                        bgcolor: "rgba(20, 15, 35, 0.95)", // พื้นหลังการ์ดสีเข้มอมม่วง (ของเดิม)
                        color: "white",
                        borderRadius: "17px", 
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden", 
                      }}
                    >
                      <Box sx={{ position: "relative" }}>
                        <Box
                          component="img"
                          src={result.image}
                          alt={result.name}
                          onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = "https://via.placeholder.com/450x350/1a1025/FFD700?text=Sparkler+Image";
                          }}
                          sx={{
                            width: "100%",
                            height: { xs: 250, sm: 320 },
                            objectFit: "cover",
                            backgroundColor: "#1a1025",
                            display: "block",
                            maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)", 
                            WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)"
                          }}
                        />
                      </Box>
                      
                      <CardContent sx={{ textAlign: "center", p: { xs: 3, sm: 4 }, pt: 0, position: "relative", zIndex: 2 }}>
                        <Typography
                          variant="overline"
                          sx={{
                            display: "inline-block",
                            color: result.type === "SSR" ? "#FFD700" : "#FF69B4",
                            fontWeight: "bold",
                            letterSpacing: 4,
                            fontSize: "0.9rem",
                            px: 2,
                            py: 0.5,
                            border: `1px solid ${result.type === "SSR" ? "rgba(255,215,0,0.5)" : "rgba(255,105,180,0.5)"}`,
                            borderRadius: "20px",
                            mb: 2,
                            textShadow: result.type === "SSR" ? "0 0 10px #FFD700" : "0 0 10px #FF69B4",
                            boxShadow: result.type === "SSR" ? "inset 0 0 10px rgba(255,215,0,0.2)" : "inset 0 0 10px rgba(255,105,180,0.2)",
                          }}
                        >
                          ✦ {result.type} ✦
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{
                            mb: 2,
                            fontWeight: "bold",
                            fontFamily: "serif",
                            fontSize: { xs: "1.5rem", sm: "2rem" },
                            background: result.type === "SSR" ? "-webkit-linear-gradient(0deg, #FFF, #FFD700)" : "-webkit-linear-gradient(0deg, #FFF, #FFB6C1)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {result.name}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            color: "#e0e0e0",
                            fontStyle: "italic",
                            lineHeight: 1.7,
                            fontSize: { xs: "0.95rem", sm: "1.1rem" },
                          }}
                        >
                          "{result.desc}"
                        </Typography>

                        <Button
                          onClick={() => setOpenModal(false)}
                          variant="outlined"
                          fullWidth
                          sx={{
                            mt: 4,
                            color: result.type === "SSR" ? "#FFD700" : "#FF69B4",
                            borderColor: result.type === "SSR" ? "rgba(255,215,0,0.5)" : "rgba(255,105,180,0.5)",
                            borderRadius: "30px",
                            py: 1.2,
                            fontSize: "1rem",
                            fontWeight: "bold",
                            backdropFilter: "blur(5px)",
                            transition: "all 0.3s",
                            "&:hover": {
                              bgcolor: result.type === "SSR" ? "rgba(255,215,0,0.15)" : "rgba(255,105,180,0.15)",
                              borderColor: result.type === "SSR" ? "#FFD700" : "#FF69B4",
                              boxShadow: result.type === "SSR" ? "0 0 15px rgba(255,215,0,0.4)" : "0 0 15px rgba(255,105,180,0.4)",
                            },
                          }}
                        >
                          เก็บรักษาแสงสว่างนี้ไว้
                        </Button>
                      </CardContent>
                    </Card>
                  </Box>
                </motion.div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}