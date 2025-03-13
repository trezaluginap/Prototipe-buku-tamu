import React, { useState } from "react";
import "../Styles.css"; // Make sure this is updated with our new CSS

const FormTamu = () => {
  const [keperluan, setKeperluan] = useState("");
  const [jenisKegiatan, setJenisKegiatan] = useState("");

  const handleSubmit = (e) => {
    if (!window.confirm("Apakah Anda yakin ingin mengirim formulir ini?")) {
      e.preventDefault();
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Form Buku Tamu</h2>

        <div className="form-group">
          <label>Nama Lengkap:</label>
          <input
            type="text"
            name="nama"
            required
            placeholder="Masukkan nama lengkap"
          />
        </div>

        <div className="form-group">
          <label>Jenis Kelamin:</label>
          <select name="jenis_kelamin">
            <option value="">Pilih jenis kelamin</option>
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" placeholder="Masukkan email" />
        </div>

        <div className="form-group">
          <label>No HP:</label>
          <input
            type="text"
            name="no_hp"
            required
            placeholder="Masukkan nomor HP"
            pattern="\d+"
            title="Hanya angka yang diperbolehkan"
          />
        </div>

        <div className="form-group">
          <label>Pekerjaan:</label>
          <input
            type="text"
            name="pekerjaan"
            placeholder="Masukkan pekerjaan"
          />
        </div>

        <div className="form-group">
          <label>Alamat:</label>
          <textarea
            name="alamat"
            required
            placeholder="Masukkan alamat"
          ></textarea>
        </div>

        <div className="form-group">
          <label>Keperluan:</label>
          <select
            name="keperluan"
            value={keperluan}
            onChange={(e) => setKeperluan(e.target.value)}
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
          <div className="subform">
            <div className="form-group">
              <label>Jenis Kegiatan:</label>
              <select
                name="jenis_kegiatan"
                value={jenisKegiatan}
                onChange={(e) => setJenisKegiatan(e.target.value)}
              >
                <option value="">Pilih jenis kegiatan</option>
                <option value="konsul_teknis">Konsul Teknis</option>
                <option value="pelatihan">Pelatihan</option>
                <option value="entry_data">Entry Data</option>
                <option value="ambil_dokumen">Ambil Dokumen</option>
                <option value="serah_dokumen">Menyerahkan Dokumen</option>
              </select>
            </div>

            {/* Subform Konsul Teknis */}
            {jenisKegiatan === "konsul_teknis" && (
              <div className="subform">
                <div className="form-group">
                  <label>Seksi:</label>
                  <select name="seksi">
                    <option value="">Pilih Seksi</option>
                    <option value="sosial">Sosial</option>
                    <option value="distribusi">Distribusi</option>
                    <option value="produksi">Produksi</option>
                    <option value="nwas">NWAS</option>
                    <option value="ipds">IPDS</option>
                  </select>
                </div>
              </div>
            )}

            {/* Form Dokumen */}
            {(jenisKegiatan === "ambil_dokumen" ||
              jenisKegiatan === "serah_dokumen") && (
              <div className="dokumen-form">
                <div className="form-group">
                  <label>Siapa yang Mengirimkan:</label>
                  <input
                    type="text"
                    name="pengirim"
                    placeholder="Nama pengirim"
                  />
                </div>

                <div className="form-group">
                  <label>Siapa Penerimanya:</label>
                  <input
                    type="text"
                    name="penerima"
                    placeholder="Nama penerima"
                  />
                </div>

                <div className="form-group">
                  <label>Jenis Dokumen:</label>
                  <input
                    type="text"
                    name="jenis_dokumen"
                    placeholder="Jenis dokumen"
                  />
                </div>

                <div className="form-group">
                  <label>Banyaknya Dokumen:</label>
                  <input
                    type="number"
                    name="jumlah_dokumen"
                    placeholder="Jumlah dokumen"
                  />
                </div>

                <div className="form-group">
                  <label>Foto Dokumen:</label>
                  <input type="file" name="foto_dokumen" />
                </div>
              </div>
            )}
          </div>
        )}

        <div className="form-group">
          <label>Siapa yang Dituju:</label>
          <select name="dituju" required>
            <option value="">Pilih Staff</option>
            <option value="budi">Budi Santoso</option>
            <option value="siti">Siti Rahmawati</option>
            <option value="agus">Agus Prasetyo</option>
            <option value="lina">Lina Kartini</option>
          </select>
        </div>

        <div className="form-group">
          <label>Tanggal Kedatangan:</label>
          <input type="date" name="tanggal_kedatangan" required />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormTamu;
