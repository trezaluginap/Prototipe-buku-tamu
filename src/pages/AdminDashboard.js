// src/pages/AdminDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles.css";

const AdminDashboard = () => {
  const [guests, setGuests] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);

  useEffect(() => {
    axios
      .get("https://67d524cbd2c7857431ef80e1.mockapi.io/Guest")
      .then((res) => setGuests(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const displayedGuests = showAll
    ? [...guests].reverse()
    : [...guests].slice(-3).reverse();

  return (
    <div className="admin-dashboard">
      <h2>Dashboard Admin</h2>

      <div className="dashboard-card">
        <h3>Ringkasan</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
          }}
        >
          <div
            style={{
              textAlign: "center",
              padding: "1rem",
              backgroundColor: "#e0f2fe",
              borderRadius: "8px",
              flex: "1",
              margin: "0 0.5rem",
            }}
          >
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#0369a1",
              }}
            >
              {guests.length}
            </div>
            <div>Total Tamu Hari Ini</div>
          </div>
          <div
            style={{
              textAlign: "center",
              padding: "1rem",
              backgroundColor: "#dcfce7",
              borderRadius: "8px",
              flex: "1",
              margin: "0 0.5rem",
            }}
          >
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#15803d",
              }}
            >
              {guests.length}
            </div>
            <div>Total Tamu Minggu Ini</div>
          </div>
          <div
            style={{
              textAlign: "center",
              padding: "1rem",
              backgroundColor: "#fee2e2",
              borderRadius: "8px",
              flex: "1",
              margin: "0 0.5rem",
            }}
          >
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#b91c1c",
              }}
            >
              {guests.filter((g) => g.perlu_tindak_lanjut).length || 0}
            </div>
            <div>Perlu Tindak Lanjut</div>
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <h3>Tamu Terbaru</h3>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "1rem",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f3f4f6", textAlign: "left" }}>
              <th
                style={{
                  padding: "0.75rem",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                Nama
              </th>
              <th
                style={{
                  padding: "0.75rem",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                Keperluan
              </th>
              <th
                style={{
                  padding: "0.75rem",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                Tanggal
              </th>
              <th
                style={{
                  padding: "0.75rem",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedGuests.map((guest) => (
              <tr key={guest.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "0.75rem" }}>{guest.nama}</td>
                <td style={{ padding: "0.75rem" }}>{guest.keperluan}</td>
                <td style={{ padding: "0.75rem" }}>
                  {guest.tanggal_kedatangan}
                </td>
                <td style={{ padding: "0.75rem" }}>
                  <button
                    onClick={() => setSelectedGuest(guest)}
                    style={{
                      padding: "0.25rem 0.5rem",
                      backgroundColor: "#205781",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      marginRight: "0.5rem",
                      cursor: "pointer",
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
                  style={{ padding: "0.75rem", textAlign: "center" }}
                >
                  Belum ada data tamu.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {guests.length > 3 && (
          <div style={{ marginTop: "1rem", textAlign: "left" }}>
            <button
              onClick={() => setShowAll(!showAll)}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#205781",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
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
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "8px",
              maxWidth: "500px",
              width: "90%",
            }}
          >
            <h3>Detail Tamu</h3>
            <p>
              <strong>Nama:</strong> {selectedGuest.nama}
            </p>
            <p>
              <strong>Email:</strong> {selectedGuest.email}
            </p>
            <p>
              <strong>No HP:</strong> {selectedGuest.no_hp}
            </p>
            <p>
              <strong>Keperluan:</strong> {selectedGuest.keperluan}
            </p>
            <p>
              <strong>Tanggal Kedatangan:</strong>{" "}
              {selectedGuest.tanggal_kedatangan}
            </p>
            <p>
              <strong>Alamat:</strong> {selectedGuest.alamat}
            </p>
            <p>
              <strong>Pekerjaan:</strong> {selectedGuest.pekerjaan}
            </p>

            <div style={{ textAlign: "right", marginTop: "1rem" }}>
              <button
                onClick={() => setSelectedGuest(null)}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
