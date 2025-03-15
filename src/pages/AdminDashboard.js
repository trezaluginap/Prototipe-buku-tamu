// src/pages/AdminDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles.css";
import BPSLogo from "../assets/BPS.png";

const AdminDashboard = () => {
  const [guests, setGuests] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);
  
  // BPS color palette
  const colors = {
    primary: "#205781", // BPS blue
    secondary: "#4d8fb8", // Lighter blue
    accent: "#f5a623", // Yellow/orange accent
    light: "#e9f2f9", // Very light blue for backgrounds
    dark: "#0e2c41", // Dark blue for text
    success: "#4caf50",
    warning: "#ff9800",
    danger: "#f44336",
    text: "#333333",
    lightGray: "#f8f9fa",
    border: "#e5e7eb"
  };

  useEffect(() => {
    axios
      .get("https://67d524cbd2c7857431ef80e1.mockapi.io/Guest")
      .then((res) => setGuests(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const displayedGuests = showAll
    ? [...guests].reverse()
    : [...guests].slice(-3).reverse();
  
  const today = new Date().toISOString().split('T')[0];
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const weekStartStr = weekStart.toISOString().split('T')[0];
  
  const todayGuests = guests.filter(g => g.tanggal_kedatangan === today).length;
  const weeklyGuests = guests.filter(g => g.tanggal_kedatangan >= weekStartStr).length;
  const followupGuests = guests.filter(g => g.perlu_tindak_lanjut).length || 0;

  return (
    <div className="admin-dashboard">
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        marginBottom: "1.5rem" 
      }}>
        <img 
          src={BPSLogo} 
          alt="BPS Logo" 
          style={{ height: "60px", marginRight: "1rem" }} 
        />
        <h2 style={{ 
          margin: 0, 
          color: colors.primary, 
          fontWeight: "700", 
          fontSize: "1.75rem",
          letterSpacing: "0.5px"
        }}>
          Dashboard Admin
        </h2>
      </div>

      <div className="dashboard-card" style={{ 
        backgroundColor: colors.light, 
        borderRadius: "12px",
        border: `1px solid ${colors.border}`,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)"
      }}>
        <h3 style={{ 
          color: colors.dark, 
          fontSize: "1.25rem", 
          marginTop: "0",
          borderBottom: `2px solid ${colors.secondary}`,
          paddingBottom: "0.75rem"
        }}>
          Ringkasan
        </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            marginTop: "1.5rem",
          }}
        >
          <div
            style={{
              textAlign: "center",
              padding: "1.5rem 1rem",
              backgroundColor: "white",
              borderRadius: "10px",
              flex: "1",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              border: `1px solid ${colors.border}`,
              transition: "transform 0.3s ease",
              cursor: "pointer",
              ":hover": {
                transform: "translateY(-5px)"
              }
            }}
          >
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: colors.primary,
                marginBottom: "0.5rem"
              }}
            >
              {todayGuests}
            </div>
            <div style={{ color: colors.text, fontWeight: "500" }}>
              Total Tamu Hari Ini
            </div>
          </div>
          <div
            style={{
              textAlign: "center",
              padding: "1.5rem 1rem",
              backgroundColor: "white",
              borderRadius: "10px",
              flex: "1",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              border: `1px solid ${colors.border}`,
              transition: "transform 0.3s ease",
              cursor: "pointer"
            }}
          >
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: colors.secondary,
                marginBottom: "0.5rem"
              }}
            >
              {weeklyGuests}
            </div>
            <div style={{ color: colors.text, fontWeight: "500" }}>
              Total Tamu Minggu Ini
            </div>
          </div>
          <div
            style={{
              textAlign: "center",
              padding: "1.5rem 1rem",
              backgroundColor: "white",
              borderRadius: "10px",
              flex: "1",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              border: `1px solid ${colors.border}`,
              transition: "transform 0.3s ease",
              cursor: "pointer"
            }}
          >
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: colors.accent,
                marginBottom: "0.5rem"
              }}
            >
              {followupGuests}
            </div>
            <div style={{ color: colors.text, fontWeight: "500" }}>
              Perlu Tindak Lanjut
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-card" style={{ 
        backgroundColor: colors.light, 
        borderRadius: "12px",
        border: `1px solid ${colors.border}`,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
        marginTop: "2rem"
      }}>
        <h3 style={{ 
          color: colors.dark, 
          fontSize: "1.25rem", 
          marginTop: "0",
          borderBottom: `2px solid ${colors.secondary}`,
          paddingBottom: "0.75rem"
        }}>
          Tamu Terbaru
        </h3>
        <div style={{ 
          backgroundColor: "white", 
          borderRadius: "8px", 
          padding: "0.5rem",
          marginTop: "1rem",
          overflowX: "auto" 
        }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: "0",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: colors.lightGray }}>
                <th
                  style={{
                    padding: "1rem",
                    borderBottom: `2px solid ${colors.secondary}`,
                    color: colors.dark,
                    fontSize: "0.95rem",
                    fontWeight: "600",
                    textAlign: "left",
                  }}
                >
                  Nama
                </th>
                <th
                  style={{
                    padding: "1rem",
                    borderBottom: `2px solid ${colors.secondary}`,
                    color: colors.dark,
                    fontSize: "0.95rem",
                    fontWeight: "600",
                    textAlign: "left",
                  }}
                >
                  Keperluan
                </th>
                <th
                  style={{
                    padding: "1rem",
                    borderBottom: `2px solid ${colors.secondary}`,
                    color: colors.dark,
                    fontSize: "0.95rem",
                    fontWeight: "600",
                    textAlign: "left",
                  }}
                >
                  Tanggal
                </th>
                <th
                  style={{
                    padding: "1rem",
                    borderBottom: `2px solid ${colors.secondary}`,
                    color: colors.dark,
                    fontSize: "0.95rem",
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedGuests.map((guest, index) => (
                <tr 
                  key={guest.id} 
                  style={{ 
                    borderBottom: `1px solid ${colors.border}`,
                    backgroundColor: index % 2 === 0 ? "white" : colors.lightGray,
                    transition: "background-color 0.2s ease",
                    ":hover": {
                      backgroundColor: colors.light
                    }
                  }}
                >
                  <td style={{ padding: "0.75rem 1rem", color: colors.text }}>{guest.nama}</td>
                  <td style={{ padding: "0.75rem 1rem", color: colors.text }}>{guest.keperluan}</td>
                  <td style={{ padding: "0.75rem 1rem", color: colors.text }}>
                    {guest.tanggal_kedatangan}
                  </td>
                  <td style={{ padding: "0.75rem 1rem", textAlign: "center" }}>
                    <button
                      onClick={() => setSelectedGuest(guest)}
                      style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: colors.primary,
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontWeight: "500",
                        transition: "background-color 0.2s ease",
                        ":hover": {
                          backgroundColor: colors.dark
                        }
                      }}
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
              {displayedGuests.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    style={{ 
                      padding: "1.5rem",
                      textAlign: "center",
                      color: colors.text
                    }}
                  >
                    Belum ada data tamu.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {guests.length > 3 && (
          <div style={{ marginTop: "1.5rem", textAlign: "right" }}>
            <button
              onClick={() => setShowAll(!showAll)}
              style={{
                padding: "0.5rem 1.25rem",
                backgroundColor: colors.secondary,
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "500",
                transition: "background-color 0.2s ease",
                ":hover": {
                  backgroundColor: colors.primary
                }
              }}
            >
              {showAll ? "Sembunyikan" : "Lihat Semua"}
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedGuest && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            animation: "fadeIn 0.3s ease"
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "12px",
              maxWidth: "500px",
              width: "90%",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              animation: "fadeIn 0.4s ease"
            }}
          >
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              marginBottom: "1.5rem",
              borderBottom: `2px solid ${colors.secondary}`,
              paddingBottom: "1rem"
            }}>
              <h3 style={{ 
                margin: 0, 
                color: colors.primary, 
                fontSize: "1.25rem", 
                fontWeight: "600" 
              }}>
                Detail Tamu
              </h3>
            </div>
            
            <div style={{ 
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem"
            }}>
              <div style={{ 
                backgroundColor: colors.light, 
                padding: "0.75rem", 
                borderRadius: "6px" 
              }}>
                <p style={{ margin: "0", color: colors.text }}>
                  <strong style={{ color: colors.dark }}>Nama:</strong><br />
                  {selectedGuest.nama}
                </p>
              </div>
              
              <div style={{ 
                backgroundColor: colors.light, 
                padding: "0.75rem", 
                borderRadius: "6px" 
              }}>
                <p style={{ margin: "0", color: colors.text }}>
                  <strong style={{ color: colors.dark }}>Email:</strong><br />
                  {selectedGuest.email}
                </p>
              </div>
              
              <div style={{ 
                backgroundColor: colors.light, 
                padding: "0.75rem", 
                borderRadius: "6px" 
              }}>
                <p style={{ margin: "0", color: colors.text }}>
                  <strong style={{ color: colors.dark }}>No HP:</strong><br />
                  {selectedGuest.no_hp}
                </p>
              </div>
              
              <div style={{ 
                backgroundColor: colors.light, 
                padding: "0.75rem", 
                borderRadius: "6px" 
              }}>
                <p style={{ margin: "0", color: colors.text }}>
                  <strong style={{ color: colors.dark }}>Tanggal:</strong><br />
                  {selectedGuest.tanggal_kedatangan}
                </p>
              </div>
              
              <div style={{ 
                backgroundColor: colors.light, 
                padding: "0.75rem", 
                borderRadius: "6px",
                gridColumn: "span 2"
              }}>
                <p style={{ margin: "0", color: colors.text }}>
                  <strong style={{ color: colors.dark }}>Keperluan:</strong><br />
                  {selectedGuest.keperluan}
                </p>
              </div>
              
              <div style={{ 
                backgroundColor: colors.light, 
                padding: "0.75rem", 
                borderRadius: "6px",
                gridColumn: "span 2"
              }}>
                <p style={{ margin: "0", color: colors.text }}>
                  <strong style={{ color: colors.dark }}>Alamat:</strong><br />
                  {selectedGuest.alamat}
                </p>
              </div>
              
              <div style={{ 
                backgroundColor: colors.light, 
                padding: "0.75rem", 
                borderRadius: "6px",
                gridColumn: "span 2"
              }}>
                <p style={{ margin: "0", color: colors.text }}>
                  <strong style={{ color: colors.dark }}>Pekerjaan:</strong><br />
                  {selectedGuest.pekerjaan}
                </p>
              </div>
            </div>

            <div style={{ 
              display: "flex", 
              justifyContent: "flex-end", 
              marginTop: "1.5rem",
              gap: "0.75rem" 
            }}>
              <button
                onClick={() => setSelectedGuest(null)}
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: colors.danger,
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "500",
                  transition: "background-color 0.2s ease",
                  ":hover": {
                    backgroundColor: "#d32f2f"
                  }
                }}
              >
                Tutup
              </button>
              <button
                onClick={() => setSelectedGuest(null)}
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: colors.primary,
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "500",
                  transition: "background-color 0.2s ease",
                  ":hover": {
                    backgroundColor: colors.dark
                  }
                }}
              >
                Tindak Lanjut
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;