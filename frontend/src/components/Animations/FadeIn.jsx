import { motion } from "framer-motion";

function FadeIn({
  children,
  delay = 0,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.45,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export default FadeIn;