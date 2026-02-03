import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        marginTop: "60px",
        padding: "40px 20px",
        background: "linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)",
        borderTop: "1px solid #00d1ff",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          flexWrap: "wrap",
          gap: "30px",
        }}
      >
        {/* Left Side: Logo and Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            flex: "1",
            minWidth: "250px",
          }}
        >
          <img
            src="/logo.png"
            alt="ExoSynergy Logo"
            style={{
              height: "50px",
              width: "auto",
              objectFit: "contain",
            }}
          />
          <div>
            <h3
              style={{
                margin: "0",
                fontSize: "24px",
                fontWeight: "bold",
                color: "#00d1ff",
                textShadow: "0 0 10px rgba(0, 209, 255, 0.5)",
              }}
            >
              ExoSynergy
            </h3>
            <p
              style={{
                margin: "5px 0 0 0",
                fontSize: "12px",
                color: "#888",
              }}
            >
              Star Classification & Analysis
            </p>
          </div>
        </div>

        {/* Center: Company Info */}
        <div
          style={{
            textAlign: "center",
            flex: "1",
            minWidth: "200px",
          }}
        >
          <p
            style={{
              margin: "0 0 8px 0",
              fontSize: "14px",
              color: "#aaa",
            }}
          >
            © 2026 ExoSynergy. All rights reserved.
          </p>
          <p
            style={{
              margin: "0",
              fontSize: "12px",
              color: "#666",
            }}
          >
            Advanced stellar classification system
          </p>
        </div>

        {/* Right Side: Contact & Social Media */}
        <div
          style={{
            flex: "1",
            minWidth: "250px",
          }}
        >
          <h4
            style={{
              margin: "0 0 15px 0",
              fontSize: "16px",
              color: "#00d1ff",
              textAlign: "right",
            }}
          >
            Contact Us
          </h4>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "15px",
            }}
          >
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                background: "#1877f2",
                borderRadius: "50%",
                color: "#fff",
                textDecoration: "none",
                fontSize: "20px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#00d1ff";
                e.target.style.color = "#000";
                e.target.style.boxShadow = "0 0 15px rgba(0, 209, 255, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#1877f2";
                e.target.style.color = "#fff";
                e.target.style.boxShadow = "none";
              }}
            >
              <i className="fab fa-facebook-f">f</i>
            </a>

            {/* Twitter */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Twitter"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                background: "#1da1f2",
                borderRadius: "50%",
                color: "#fff",
                textDecoration: "none",
                fontSize: "20px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#00d1ff";
                e.target.style.color = "#000";
                e.target.style.boxShadow = "0 0 15px rgba(0, 209, 255, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#1da1f2";
                e.target.style.color = "#fff";
                e.target.style.boxShadow = "none";
              }}
            >
              X
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                background: "#0a66c2",
                borderRadius: "50%",
                color: "#fff",
                textDecoration: "none",
                fontSize: "20px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#00d1ff";
                e.target.style.color = "#000";
                e.target.style.boxShadow = "0 0 15px rgba(0, 209, 255, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#0a66c2";
                e.target.style.color = "#fff";
                e.target.style.boxShadow = "none";
              }}
            >
              in
            </a>

            {/* Email */}
            <a
              href="mailto:contact@exosynergy.com"
              title="Email"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                background: "#ea4335",
                borderRadius: "50%",
                color: "#fff",
                textDecoration: "none",
                fontSize: "20px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#00d1ff";
                e.target.style.color = "#000";
                e.target.style.boxShadow = "0 0 15px rgba(0, 209, 255, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#ea4335";
                e.target.style.color = "#fff";
                e.target.style.boxShadow = "none";
              }}
            >
              ✉
            </a>

            {/* GitHub */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                background: "#333",
                borderRadius: "50%",
                color: "#fff",
                textDecoration: "none",
                fontSize: "20px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#00d1ff";
                e.target.style.color = "#000";
                e.target.style.boxShadow = "0 0 15px rgba(0, 209, 255, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#333";
                e.target.style.color = "#fff";
                e.target.style.boxShadow = "none";
              }}
            >
              ★
            </a>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div
        style={{
          borderTop: "1px solid #333",
          marginTop: "30px",
          paddingTop: "20px",
          textAlign: "center",
          maxWidth: "1200px",
          margin: "30px auto 0",
        }}
      >
        <p
          style={{
            margin: "0",
            fontSize: "11px",
            color: "#555",
          }}
        >
          Powered by advanced machine learning and stellar spectroscopy
        </p>
      </div>
    </footer>
  );
};

export default Footer;
