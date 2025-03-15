import React, { useState } from "react";
import "../Styles.css";

const FormTamu = () => {
  const [keperluan, setKeperluan] = useState("");
  const [jenisKegiatan, setJenisKegiatan] = useState("");
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0].name : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!window.confirm("Apakah Anda yakin ingin mengirim formulir ini?"))
      return;

    try {
      const response = await fetch(
        "https://67d524cbd2c7857431ef80e1.mockapi.io/Guest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Data berhasil dikirim!");
      } else {
        alert("Gagal mengirim data.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      alert("Terjadi kesalahan saat mengirim data.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Form Buku Tamu</h2>

        <div className="form-group">
          <label>Nama Lengkap:</label>
          <input type="text" name="nama" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Jenis Kelamin:</label>
          <select name="jenis_kelamin" onChange={handleChange}>
            <option value="">Pilih jenis kelamin</option>
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>No HP:</label>
          <input type="text" name="no_hp" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Pekerjaan:</label>
          <input type="text" name="pekerjaan" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Alamat:</label>
          <textarea name="alamat" required onChange={handleChange}></textarea>
        </div>

        <div className="form-group">
          <label>Keperluan:</label>
          <select
            name="keperluan"
            value={keperluan}
            onChange={(e) => {
              setKeperluan(e.target.value);
              handleChange(e);
            }}
            required
          >
            <option value="">Pilih keperluan</option>
            <option value="mitra_statistik">Kegiatan Mitra Statistik</option>
            <option value="konsultasi">Konsultasi Statistik</option>
            <option value="tamu_umum">Tamu Umum</option>
          </select>
        </div>

        {/* Subform Mitra Statistik */}
        {keperluan === "mitra_statistik" && (
          <>
            <div className="form-group">
              <label>Jenis Kegiatan:</label>
              <select
                name="jenis_kegiatan"
                value={jenisKegiatan}
                onChange={(e) => {
                  setJenisKegiatan(e.target.value);
                  handleChange(e);
                }}
              >
                <option value="">Pilih jenis kegiatan</option>
                <option value="konsul_teknis">Konsul Teknis</option>
                <option value="pelatihan">Pelatihan</option>
                <option value="entry_data">Entry Data</option>
                <option value="ambil_dokumen">Ambil Dokumen</option>
                <option value="serah_dokumen">Menyerahkan Dokumen</option>
              </select>
            </div>

            {jenisKegiatan === "konsul_teknis" && (
              <div className="form-group">
                <label>Seksi:</label>
                <select name="seksi" onChange={handleChange}>
                  <option value="">Pilih Seksi</option>
                  <option value="sosial">Sosial</option>
                  <option value="distribusi">Distribusi</option>
                  <option value="produksi">Produksi</option>
                  <option value="nwas">NWAS</option>
                  <option value="ipds">IPDS</option>
                </select>
              </div>
            )}

            {(jenisKegiatan === "ambil_dokumen" ||
              jenisKegiatan === "serah_dokumen") && (
              <>
                <div className="form-group">
                  <label>Pengirim:</label>
                  <input type="text" name="pengirim" onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Penerima:</label>
                  <input type="text" name="penerima" onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Jenis Dokumen:</label>
                  <input
                    type="text"
                    name="jenis_dokumen"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Jumlah Dokumen:</label>
                  <input
                    type="number"
                    name="jumlah_dokumen"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Foto Dokumen:</label>
                  <input
                    type="file"
                    name="foto_dokumen"
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
          </>
        )}

        <div className="form-group">
          <label>Dituju:</label>
          <select name="dituju" required onChange={handleChange}>
            <option value="">Pilih Staff</option>
            <option value="budi">Budi Santoso</option>
            <option value="siti">Siti Rahmawati</option>
            <option value="agus">Agus Prasetyo</option>
            <option value="lina">Lina Kartini</option>
          </select>
        </div>

        <div className="form-group">
          <label>Tanggal Kedatangan:</label>
          <input
            type="date"
            name="tanggal_kedatangan"
            required
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormTamu;
