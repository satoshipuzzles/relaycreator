import React from "react";

interface LandingPageProps {
  // Optionally define props here if needed (e.g., video source, title, etc.)
}

const LandingPage: React.FC<LandingPageProps> = () => {
  // Replace with your actual video source (local file in "public" folder or an external link)
  const videoSrc = "/path/to/your-video.mp4";

  return (
    <div style={styles.container}>
      {/* Header / Hero Section */}
      <header style={styles.heroSection}>
        <h1 style={styles.heroTitle}>Welcome to My Video Landing Page</h1>
        <p style={styles.heroSubtitle}>
          Enjoy this modern dark-themed page showcasing a featured video
        </p>
      </header>

      {/* Video Section */}
      <section style={styles.videoSection}>
        <video style={styles.video} src={videoSrc} controls>
          Your browser does not support the video tag.
        </video>
      </section>
    </div>
  );
};

// Inline Styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: "#121212",
    color: "#ffffff",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heroSection: {
    textAlign: "center",
    padding: "60px 20px 40px",
    maxWidth: "800px",
  },
  heroTitle: {
    fontSize: "3rem",
    marginBottom: "20px",
  },
  heroSubtitle: {
    fontSize: "1.2rem",
    color: "#b3b3b3",
    marginBottom: "0",
  },
  videoSection: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "20px",
  },
  video: {
    width: "80%",
    maxWidth: "800px",
    outline: "none",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
  },
};

export default LandingPage;
