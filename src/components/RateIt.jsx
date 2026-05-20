import { useState, useEffect, useRef } from "react";

const categories = [
  { id: "car", label: "Rate My Car", emoji: "🚗", color: "#FF4D4D", desc: "Show off your ride" },
  { id: "business", label: "Rate My Business", emoji: "🏢", color: "#FF8C00", desc: "Get real feedback" },
  { id: "brand", label: "Rate My Brand", emoji: "⚡", color: "#FFD700", desc: "Logo, vibe, identity" },
  { id: "parenting", label: "Rate My Parenting", emoji: "👶", color: "#00E5A0", desc: "Honest community takes" },
  { id: "shoe", label: "Rate My Shoe", emoji: "👟", color: "#00BFFF", desc: "Heat or L?" },
  { id: "art", label: "Rate My Art", emoji: "🎨", color: "#BF5FFF", desc: "Raw creativity judged" },
  { id: "movie", label: "Rate a Movie", emoji: "🎬", color: "#FF69B4", desc: "Your takes, ranked" },
];

const samplePosts = [
  { id: 1, user: "Jordan K.", category: "car", emoji: "🚗", color: "#FF4D4D", title: "Just got my dream car 🔥", rating: 87, votes: 1243, time: "2h ago", gradient: "from-red-900 to-red-700" },
  { id: 2, user: "Maya R.", category: "shoe", emoji: "👟", color: "#00BFFF", title: "Air Max 97 in full silver 😤", rating: 92, votes: 876, time: "4h ago", gradient: "from-blue-900 to-cyan-800" },
  { id: 3, user: "Dev T.", category: "art", emoji: "🎨", color: "#BF5FFF", title: "3 months on this piece", rating: 74, votes: 432, time: "6h ago", gradient: "from-purple-900 to-fuchsia-800" },
  { id: 4, user: "Serena M.", category: "brand", emoji: "⚡", color: "#FFD700", title: "Redesigned my logo — thoughts?", rating: 61, votes: 289, time: "8h ago", gradient: "from-yellow-900 to-amber-700" },
  { id: 5, user: "Chris B.", category: "movie", emoji: "🎬", color: "#FF69B4", title: "Sinners (2025) — overlooked gem?", rating: 95, votes: 3102, time: "1d ago", gradient: "from-pink-900 to-rose-700" },
];

function getRatingLabel(r) {
  if (r >= 90) return { label: "LEGENDARY", color: "#FFD700" };
  if (r >= 75) return { label: "HEAT", color: "#FF4D4D" };
  if (r >= 60) return { label: "SOLID", color: "#00E5A0" };
  if (r >= 45) return { label: "MID", color: "#FF8C00" };
  return { label: "L", color: "#888" };
}

function RatingArc({ value, color }) {
  const r = 42;
  const circumference = 2 * Math.PI * r;
  const dash = (value / 100) * circumference;
  return (
    <svg width="110" height="110" viewBox="0 0 110 110" style={{ transform: "rotate(-90deg)" }}>
      <circle cx="55" cy="55" r={r} fill="none" stroke="#1a1a1a" strokeWidth="10" />
      <circle
        cx="55" cy="55" r={r} fill="none"
        stroke={color} strokeWidth="10"
        strokeDasharray={`${dash} ${circumference}`}
        strokeLinecap="round"
        style={{ transition: "stroke-dasharray 1s cubic-bezier(0.34,1.56,0.64,1)", filter: `drop-shadow(0 0 8px ${color})` }}
      />
    </svg>
  );
}

function CategorySpiral({ onSelect, onClose }) {
  const [visible, setVisible] = useState([]);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    categories.forEach((_, i) => {
      setTimeout(() => setVisible(v => [...v, i]), i * 80);
    });
  }, []);

  const positions = categories.map((_, i) => {
    const angle = (i / categories.length) * 2 * Math.PI - Math.PI / 2;
    const radius = 155;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  });

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)",
    }}
      onClick={onClose}
    >
      <div style={{ position: "relative", width: 360, height: 360 }} onClick={e => e.stopPropagation()}>
        {/* Center orb */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: 72, height: 72, borderRadius: "50%",
          background: "radial-gradient(circle, #ffffff22, #ffffff08)",
          border: "1.5px solid #ffffff33",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 24, cursor: "pointer", zIndex: 10,
        }} onClick={onClose}>✕</div>

        {/* Orbit rings */}
        {[1].map(r => (
          <div key={r} style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: 320, height: 320, borderRadius: "50%",
            border: "1px dashed #ffffff11",
            animation: "spin 30s linear infinite",
          }} />
        ))}

        {categories.map((cat, i) => {
          const pos = positions[i];
          const isVisible = visible.includes(i);
          const isHov = hovered === i;
          return (
            <div
              key={cat.id}
              onClick={() => onSelect(cat)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: "absolute",
                top: `calc(50% + ${pos.y}px)`,
                left: `calc(50% + ${pos.x}px)`,
                transform: `translate(-50%,-50%) scale(${isVisible ? (isHov ? 1.18 : 1) : 0})`,
                opacity: isVisible ? 1 : 0,
                transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                cursor: "pointer",
                zIndex: 20,
              }}
            >
              <div style={{
                width: 70, height: 70, borderRadius: "50%",
                background: `radial-gradient(circle at 35% 35%, ${cat.color}44, ${cat.color}11)`,
                border: `2px solid ${cat.color}`,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                boxShadow: isHov ? `0 0 24px ${cat.color}, 0 0 48px ${cat.color}44` : `0 0 10px ${cat.color}44`,
                transition: "box-shadow 0.3s",
              }}>
                <span style={{ fontSize: 26 }}>{cat.emoji}</span>
              </div>
              {isHov && (
                <div style={{
                  position: "absolute", top: "110%", left: "50%",
                  transform: "translateX(-50%)",
                  background: "#111", border: `1px solid ${cat.color}`,
                  borderRadius: 8, padding: "4px 10px",
                  fontSize: 11, color: cat.color, whiteSpace: "nowrap",
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                  letterSpacing: 1,
                }}>
                  {cat.label.toUpperCase()}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes spin { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg); } }
      `}</style>
    </div>
  );
}

function PostCard({ post, onRate }) {
  const [userRating, setUserRating] = useState(null);
  const [hovering, setHovering] = useState(false);
  const [hoverVal, setHoverVal] = useState(null);
  const [localRating, setLocalRating] = useState(post.rating);
  const [localVotes, setLocalVotes] = useState(post.votes);
  const [rated, setRated] = useState(false);
  const trackRef = useRef(null);
  const { label, color } = getRatingLabel(localRating);

  const handleTrackClick = (e) => {
    if (rated) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.round(Math.max(1, Math.min(100, (x / rect.width) * 100)));
    setUserRating(pct);
    setLocalRating(Math.round((localRating * localVotes + pct) / (localVotes + 1)));
    setLocalVotes(v => v + 1);
    setRated(true);
  };

  const handleTrackMove = (e) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.round(Math.max(1, Math.min(100, (x / rect.width) * 100)));
    setHoverVal(pct);
  };

  return (
    <div style={{
      background: "linear-gradient(135deg, #111 0%, #161616 100%)",
      border: "1px solid #222",
      borderRadius: 20,
      overflow: "hidden",
      position: "relative",
      transition: "transform 0.2s, box-shadow 0.2s",
      cursor: "default",
    }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => { setHovering(false); setHoverVal(null); }}
      style={{
        background: "linear-gradient(135deg, #111 0%, #161616 100%)",
        border: hovering ? `1px solid ${post.color}44` : "1px solid #222",
        borderRadius: 20, overflow: "hidden", position: "relative",
        transition: "all 0.25s",
        transform: hovering ? "translateY(-2px)" : "none",
        boxShadow: hovering ? `0 12px 40px ${post.color}22` : "0 4px 20px #00000066",
      }}
    >
      {/* Video placeholder */}
      <div style={{
        height: 200,
        background: `linear-gradient(135deg, #${post.color.slice(1)}18, #0a0a0a)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          fontSize: 64, opacity: 0.15,
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%) scale(2.5)",
          filter: `blur(2px)`,
        }}>{post.emoji}</div>
        <div style={{
          width: 60, height: 60, borderRadius: "50%",
          background: "#00000066", border: `2px solid ${post.color}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, position: "relative", zIndex: 1,
          boxShadow: `0 0 20px ${post.color}44`,
        }}>▶</div>
        <div style={{
          position: "absolute", top: 12, left: 12,
          background: `${post.color}22`, border: `1px solid ${post.color}`,
          borderRadius: 20, padding: "3px 10px",
          fontSize: 11, color: post.color,
          fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
          letterSpacing: 1,
        }}>{post.emoji} {post.category.toUpperCase()}</div>
        <div style={{
          position: "absolute", bottom: 12, right: 12,
          fontSize: 11, color: "#888",
          fontFamily: "'DM Sans', sans-serif",
        }}>{post.time}</div>
      </div>

      <div style={{ padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>{post.title}</div>
            <div style={{ fontSize: 12, color: "#666", fontFamily: "'DM Sans', sans-serif" }}>by {post.user} · {localVotes.toLocaleString()} ratings</div>
          </div>
          <div style={{ position: "relative" }}>
            <RatingArc value={localRating} color={post.color} />
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", lineHeight: 1, fontFamily: "'DM Sans', sans-serif" }}>{localRating}</div>
              <div style={{ fontSize: 8, color: color, fontWeight: 800, letterSpacing: 1 }}>{label}</div>
            </div>
          </div>
        </div>

        {/* Rating track */}
        <div style={{ marginTop: 6 }}>
          <div style={{
            fontSize: 11, color: "#555", marginBottom: 8,
            fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: 0.5,
          }}>
            {rated ? `YOU RATED ${userRating}/100` : "SLIDE TO RATE"}
          </div>
          <div
            ref={trackRef}
            onClick={handleTrackClick}
            onMouseMove={handleTrackMove}
            onMouseLeave={() => setHoverVal(null)}
            style={{
              height: 10, borderRadius: 10,
              background: "#1e1e1e",
              border: "1px solid #2a2a2a",
              cursor: rated ? "default" : "pointer",
              position: "relative", overflow: "hidden",
            }}
          >
            <div style={{
              height: "100%",
              width: `${hoverVal && !rated ? hoverVal : (userRating || 0)}%`,
              background: rated
                ? `linear-gradient(90deg, ${post.color}, ${post.color}bb)`
                : `linear-gradient(90deg, ${post.color}88, ${post.color}44)`,
              borderRadius: 10,
              transition: rated ? "width 0.6s cubic-bezier(0.34,1.2,0.64,1)" : "width 0.05s",
              boxShadow: `0 0 8px ${post.color}66`,
            }} />
            {hoverVal && !rated && (
              <div style={{
                position: "absolute", top: -28,
                left: `calc(${hoverVal}% - 16px)`,
                background: "#111", border: `1px solid ${post.color}`,
                borderRadius: 6, padding: "2px 6px",
                fontSize: 11, color: post.color,
                fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                pointerEvents: "none",
              }}>{hoverVal}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function UploadModal({ selectedCategory, onClose }) {
  const [step, setStep] = useState(1);
  const [cat, setCat] = useState(selectedCategory);
  const [drag, setDrag] = useState(false);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.9)", backdropFilter: "blur(16px)",
    }} onClick={onClose}>
      <div style={{
        background: "#0f0f0f", border: "1px solid #222",
        borderRadius: 24, padding: 32, width: 420,
        maxWidth: "90vw", position: "relative",
      }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16,
          background: "#1a1a1a", border: "1px solid #333",
          borderRadius: "50%", width: 32, height: 32,
          color: "#888", cursor: "pointer", fontSize: 14,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>✕</button>

        <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 6, fontFamily: "'DM Serif Display', serif" }}>
          Post to Rate It
        </div>
        <div style={{ fontSize: 13, color: "#555", marginBottom: 24, fontFamily: "'DM Sans', sans-serif" }}>
          Upload your content and let the community judge
        </div>

        {/* Category selector */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: "#555", marginBottom: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: 1 }}>CATEGORY</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {categories.map(c => (
              <button key={c.id} onClick={() => setCat(c)} style={{
                background: cat?.id === c.id ? `${c.color}22` : "#1a1a1a",
                border: `1px solid ${cat?.id === c.id ? c.color : "#2a2a2a"}`,
                borderRadius: 20, padding: "6px 14px",
                color: cat?.id === c.id ? c.color : "#666",
                fontSize: 12, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
                transition: "all 0.2s",
              }}>{c.emoji} {c.label.replace("Rate ", "")}</button>
            ))}
          </div>
        </div>

        {/* Drop zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={e => { e.preventDefault(); setDrag(false); }}
          style={{
            border: `2px dashed ${drag ? (cat?.color || "#fff") : "#2a2a2a"}`,
            borderRadius: 16, height: 140,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            background: drag ? "#ffffff06" : "#0a0a0a",
            cursor: "pointer", transition: "all 0.2s",
            marginBottom: 20,
          }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🎥</div>
          <div style={{ fontSize: 13, color: "#555", fontFamily: "'DM Sans', sans-serif" }}>Drop your video here or <span style={{ color: cat?.color || "#fff", textDecoration: "underline" }}>browse</span></div>
          <div style={{ fontSize: 11, color: "#333", marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>MP4, MOV up to 2GB</div>
        </div>

        {/* Title */}
        <input placeholder="Give your post a title..." style={{
          width: "100%", background: "#1a1a1a", border: "1px solid #2a2a2a",
          borderRadius: 12, padding: "12px 16px", color: "#fff",
          fontSize: 14, fontFamily: "'DM Sans', sans-serif",
          outline: "none", marginBottom: 16, boxSizing: "border-box",
        }} />

        <button style={{
          width: "100%", padding: "14px",
          background: cat ? `linear-gradient(135deg, ${cat.color}, ${cat.color}99)` : "linear-gradient(135deg, #333, #222)",
          border: "none", borderRadius: 14,
          color: "#fff", fontSize: 15, fontWeight: 800,
          cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          letterSpacing: 0.5,
          boxShadow: cat ? `0 4px 20px ${cat.color}44` : "none",
          transition: "all 0.3s",
        }}>
          POST & LET THEM RATE ⚡
        </button>
      </div>
    </div>
  );
}

export default function RateIt() {
  const [showSpiral, setShowSpiral] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadCategory, setUploadCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [feed, setFeed] = useState(samplePosts);
  const [searchPulsing, setSearchPulsing] = useState(false);

  const filteredFeed = activeCategory
    ? feed.filter(p => p.category === activeCategory.id)
    : feed;

  const handleSearchClick = () => {
    setSearchPulsing(true);
    setTimeout(() => setSearchPulsing(false), 600);
    setShowSpiral(true);
  };

  const handleCategorySelect = (cat) => {
    setActiveCategory(cat);
    setShowSpiral(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080808",
      fontFamily: "'DM Sans', sans-serif",
      color: "#fff",
      overflowX: "hidden",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&family=DM+Serif+Display&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header */}
      <div style={{
        padding: "20px 24px 0",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 50,
        background: "linear-gradient(180deg, #080808 60%, transparent)",
        backdropFilter: "blur(10px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, #FF4D4D, #FF8C00, #FFD700)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, fontWeight: 900,
            backgroundSize: "200%",
            animation: "gradientShift 3s ease infinite",
          }}>⚡</div>
          <div>
            <div style={{
              fontSize: 20, fontWeight: 900, letterSpacing: -0.5,
              fontFamily: "'DM Serif Display', serif",
              background: "linear-gradient(90deg, #fff, #888)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Rate It</div>
            <div style={{ fontSize: 9, color: "#444", letterSpacing: 2, fontWeight: 700, marginTop: -2 }}>COMMUNITY RATINGS</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button
            onClick={() => { setShowUpload(true); setUploadCategory(activeCategory); }}
            style={{
              background: "linear-gradient(135deg, #FF4D4D22, #FF8C0022)",
              border: "1px solid #FF4D4D44",
              borderRadius: 20, padding: "8px 16px",
              color: "#FF4D4D", fontSize: 13, fontWeight: 700,
              cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
            }}>+ Post</button>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "#1a1a1a", border: "1px solid #2a2a2a",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, cursor: "pointer",
          }}>👤</div>
        </div>
      </div>

      {/* Hero search button */}
      <div style={{ padding: "40px 24px 24px", textAlign: "center" }}>
        <div style={{
          fontSize: 13, color: "#444", letterSpacing: 3, fontWeight: 700,
          marginBottom: 12,
        }}>WHAT GETS RATED TODAY?</div>
        <div style={{
          fontSize: 38, fontWeight: 900, letterSpacing: -1.5,
          fontFamily: "'DM Serif Display', serif",
          lineHeight: 1.1, marginBottom: 28,
          background: "linear-gradient(135deg, #fff 0%, #888 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          Let the community<br />be the judge.
        </div>

        {/* THE SEARCH/SPIRAL BUTTON */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", marginBottom: 32 }}>
          {searchPulsing && <div style={{
            position: "absolute", width: 200, height: 50, borderRadius: 30,
            border: "2px solid #fff4",
            animation: "pulse-ring 0.6s ease-out forwards",
          }} />}
          <button
            onClick={handleSearchClick}
            style={{
              background: "linear-gradient(135deg, #1a1a1a, #111)",
              border: "1px solid #333",
              borderRadius: 30, padding: "14px 28px",
              display: "flex", alignItems: "center", gap: 12,
              cursor: "pointer", transition: "all 0.2s",
              width: 280,
            }}
          >
            <span style={{ fontSize: 20 }}>🔍</span>
            <span style={{ fontSize: 15, color: "#555", fontFamily: "'DM Sans', sans-serif", flex: 1, textAlign: "left" }}>
              Browse categories...
            </span>
            <span style={{
              fontSize: 11, color: "#333", border: "1px solid #333",
              borderRadius: 8, padding: "2px 8px",
            }}>TAP</span>
          </button>
        </div>

        {/* Active category pill */}
        {activeCategory && (
          <div style={{ display: "flex", justifyContent: "center", gap: 8, animation: "fadeUp 0.3s ease" }}>
            <div style={{
              background: `${activeCategory.color}22`,
              border: `1px solid ${activeCategory.color}`,
              borderRadius: 20, padding: "6px 16px",
              fontSize: 13, color: activeCategory.color, fontWeight: 700,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              {activeCategory.emoji} {activeCategory.label}
              <span
                onClick={() => setActiveCategory(null)}
                style={{ cursor: "pointer", opacity: 0.6 }}>✕</span>
            </div>
          </div>
        )}
      </div>

      {/* Category quick strips */}
      {!activeCategory && (
        <div style={{ paddingBottom: 8, overflowX: "auto", paddingLeft: 24 }}>
          <div style={{ display: "flex", gap: 10, width: "max-content", paddingRight: 24 }}>
            {categories.map((cat, i) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat)} style={{
                background: "#111",
                border: `1px solid #222`,
                borderRadius: 20, padding: "8px 16px",
                color: "#888", fontSize: 13, fontWeight: 600,
                cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                whiteSpace: "nowrap", transition: "all 0.2s",
                animation: `fadeUp 0.4s ease ${i * 0.05}s both`,
              }}>
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Feed */}
      <div style={{ padding: "20px 20px 100px", maxWidth: 600, margin: "0 auto" }}>
        <div style={{
          fontSize: 12, color: "#444", letterSpacing: 2, fontWeight: 700,
          marginBottom: 16,
        }}>
          {activeCategory ? `${activeCategory.label.toUpperCase()} — ${filteredFeed.length} POSTS` : "🔥 TRENDING NOW"}
        </div>

        {filteredFeed.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "60px 20px",
            color: "#444", fontFamily: "'DM Sans', sans-serif",
          }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>{activeCategory?.emoji}</div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>No posts yet</div>
            <div style={{ fontSize: 13 }}>Be the first to post in {activeCategory?.label}</div>
            <button
              onClick={() => { setShowUpload(true); setUploadCategory(activeCategory); }}
              style={{
                marginTop: 20, background: `${activeCategory?.color}22`,
                border: `1px solid ${activeCategory?.color}`,
                borderRadius: 20, padding: "10px 24px",
                color: activeCategory?.color, fontSize: 14, fontWeight: 700,
                cursor: "pointer",
              }}>+ Post First</button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {filteredFeed.map((post, i) => (
              <div key={post.id} style={{ animation: `fadeUp 0.4s ease ${i * 0.08}s both` }}>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "linear-gradient(180deg, transparent, #080808 40%)",
        padding: "20px 24px 28px",
        display: "flex", justifyContent: "space-around", alignItems: "center",
        zIndex: 50,
      }}>
        {[
          { icon: "🏠", label: "Home" },
          { icon: "🔥", label: "Trending" },
          { icon: "➕", label: "Post", action: () => setShowUpload(true) },
          { icon: "🔔", label: "Alerts" },
          { icon: "👤", label: "Profile" },
        ].map(item => (
          <button key={item.label} onClick={item.action}
            style={{
              background: "none", border: "none",
              display: "flex", flexDirection: "column",
              alignItems: "center", gap: 4, cursor: "pointer",
              opacity: item.label === "Home" ? 1 : 0.4,
              transition: "opacity 0.2s",
            }}>
            <span style={{
              fontSize: item.label === "Post" ? 28 : 20,
              background: item.label === "Post" ? "linear-gradient(135deg, #FF4D4D, #FF8C00)" : "none",
              WebkitBackgroundClip: item.label === "Post" ? "text" : "none",
              WebkitTextFillColor: item.label === "Post" ? "transparent" : "inherit",
            }}>{item.icon}</span>
            <span style={{ fontSize: 9, color: "#555", fontWeight: 700, letterSpacing: 1 }}>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Modals */}
      {showSpiral && (
        <CategorySpiral
          onSelect={handleCategorySelect}
          onClose={() => setShowSpiral(false)}
        />
      )}
      {showUpload && (
        <UploadModal
          selectedCategory={uploadCategory}
          onClose={() => { setShowUpload(false); setUploadCategory(null); }}
        />
      )}
    </div>
  );
}
