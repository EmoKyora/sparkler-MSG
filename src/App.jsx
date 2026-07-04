import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Zoom,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import confetti from "canvas-confetti";

// แก้ไข: ใช้ String path ทั้งหมด (รูปต้องอยู่ในโฟลเดอร์ public/images/)
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

  // แก้ไข: กำหนด Audio ใน useEffect เพื่อป้องกันแอปแครช (จอขาว) จาก SSR
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.loop = true;
      audioRef.current.play().catch((err) => console.error("Audio playback error:", err));
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
            particleCount: 200,
            spread: 100,
            origin: { y: 0.5 },
            colors: ["#FFD700", "#FF69B4", "#FF4500", "#8A2BE2"],
            zIndex: 9999,
          });
        } catch (err) {
          console.error("Confetti Error:", err);
        }
      }
    }, 3000);
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
      {/* Background Particles */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: "100vh",
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            opacity: 0,
          }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.8, 0],
            scale: Math.random() * 2 + 0.5,
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
          style={{
            position: "absolute",
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            backgroundColor: i % 3 === 0 ? "#FF69B4" : "#FFD700",
            borderRadius: "50%",
            boxShadow: `0 0 15px ${i % 3 === 0 ? "#FF69B4" : "#FFD700"}`,
            zIndex: 0,
          }}
        />
      ))}

      <IconButton
        onClick={toggleMusic}
        sx={{
          position: "absolute",
          top: { xs: 15, md: 30 },
          right: { xs: 15, md: 30 },
          color: "#FFD700",
          bgcolor: "rgba(0,0,0,0.3)",
          backdropFilter: "blur(5px)",
          zIndex: 10,
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
              "&:hover": {
                bgcolor: "rgba(255,215,0,0.2)",
                border: "2px solid #FFF",
              },
            }}
          >
            ✨ อธิษฐานขอไฟเย็น ✨
          </Button>
        </motion.div>
      </Box>

      <Dialog
        open={openModal}
        onClose={() => !isRolling && setOpenModal(false)}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Zoom}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
            overflow: "visible",
            margin: "16px",
          },
        }}
        BackdropProps={{
          style: {
            backgroundColor: "rgba(5, 5, 16, 0.9)",
            backdropFilter: "blur(8px)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          <AnimatePresence mode="wait">
            {isRolling && (
              <motion.div
                key="rolling"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1, rotate: [0, 10, -10, 0] }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.5, repeat: Infinity }}
                style={{ textAlign: "center" }}
              >
                <Typography
                  variant="h1"
                  sx={{ filter: "drop-shadow(0 0 20px #FFD700)" }}
                >
                  🪄
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ mt: 2, color: "#FFD700", letterSpacing: 2 }}
                >
                  กำลังอธิษฐาน...
                </Typography>
              </motion.div>
            )}

            {!isRolling && result && (
              <motion.div
                key="result"
                initial={{ scale: 0.8, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", damping: 15, stiffness: 100 }}
                style={{ width: "100%" }}
              >
                <Card
                  sx={{
                    width: "100%",
                    maxWidth: 450,
                    mx: "auto",
                    bgcolor: "rgba(20, 15, 35, 0.8)",
                    backdropFilter: "blur(15px)",
                    color: "white",
                    borderRadius: 4,
                    border:
                      result.type === "SSR"
                        ? "2px solid #FFD700"
                        : "1px solid rgba(255,255,255,0.3)",
                    boxShadow:
                      result.type === "SSR"
                        ? "0 0 50px rgba(255,215,0,0.4)"
                        : "0 0 25px rgba(255,255,255,0.1)",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height: { xs: 280, sm: 350 },
                      objectFit: "cover",
                      // ป้องกันกรณีรูปไม่มีให้แสดง Fallback สีเทาแทนจอขาว
                      backgroundColor: "#2a1538" 
                    }}
                    image={result.image}
                    alt={result.name}
                    onError={(e) => {
                      // ถ้าโหลดรูปไม่ขึ้น จะไม่ทำให้หน้าแครช
                      e.target.src = "https://via.placeholder.com/450x350/2a1538/FFD700?text=Sparkler+Light";
                    }}
                  />
                  <CardContent
                    sx={{ textAlign: "center", p: { xs: 3, sm: 4 } }}
                  >
                    <Typography
                      variant="overline"
                      sx={{
                        color: result.type === "SSR" ? "#FFD700" : "#A9A9A9",
                        fontWeight: "bold",
                        letterSpacing: 4,
                        fontSize: "0.9rem",
                        textShadow:
                          result.type === "SSR" ? "0 0 10px #FFD700" : "none",
                      }}
                    >
                      ✦ {result.type} ✦
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        mt: 1,
                        mb: 2,
                        fontWeight: "bold",
                        fontFamily: "serif",
                        fontSize: { xs: "1.5rem", sm: "2rem" },
                      }}
                    >
                      {result.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#e0e0e0",
                        fontStyle: "italic",
                        lineHeight: 1.6,
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
                        color: result.type === "SSR" ? "#FFD700" : "#fff",
                        borderColor: result.type === "SSR" ? "#FFD700" : "#fff",
                        borderRadius: "20px",
                        py: 1,
                        "&:hover": {
                          bgcolor:
                            result.type === "SSR"
                              ? "rgba(255,215,0,0.1)"
                              : "rgba(255,255,255,0.1)",
                        },
                      }}
                    >
                      เก็บรักษาแสงสว่างนี้ไว้
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Dialog>
    </Box>
  );
}