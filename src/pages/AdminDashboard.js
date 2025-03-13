// src/pages/AdminDashboard.js
import React, { useContext } from "react";
import { GuestContext } from "../context/GuestContext";
import "../Styles.css";

const AdminDashboard = () => {
  const { guests } = useContext(GuestContext);

  // Ambil 3 tamu terbaru (jika ada)
  const recentGuests = guests.slice(-3).reverse();

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
            {recentGuests.map((guest, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "0.75rem" }}>{guest.nama}</td>
                <td style={{ padding: "0.75rem" }}>{guest.keperluan}</td>
                <td style={{ padding: "0.75rem" }}>
                  {guest.tanggal_kedatangan}
                </td>
                <td style={{ padding: "0.75rem" }}>
                  <button
                    style={{
                      padding: "0.25rem 0.5rem",
                      backgroundColor: "#3a86ff",
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
            {recentGuests.length === 0 && (
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
      </div>
    </div>
  );
};

export default AdminDashboard;
