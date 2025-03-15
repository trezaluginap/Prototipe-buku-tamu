import React, { useState } from "react";
import "../Styles.css";
import BPSLogo from "../assets/BPS.png";

const FormTamu = () => {
  const [keperluan, setKeperluan] = useState("");
  const [jenisKegiatan, setJenisKegiatan] = useState("");
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    setIsSubmitting(true);
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
        // Reset form
        e.target.reset();
        setKeperluan("");
        setJenisKegiatan("");
        setFormData({});
      } else {
        alert("Gagal mengirim data.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      alert("Terjadi kesalahan saat mengirim data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-header">
          <img src={BPSLogo} alt="BPS Logo" className="form-logo" />
          <h2>Buku Tamu</h2>
          <p className="form-description">
            Silakan lengkapi formulir di bawah ini untuk melakukan registrasi kunjungan
          </p>
        </div>

        <div className="form-content">
          <div className="form-group">
            <label className="required">Nama Lengkap</label>
            <input 
              type="text" 
              name="nama" 
              required 
              onChange={handleChange} 
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <div className="form-group">
            <label className="required">Jenis Kelamin</label>
            <select name="jenis_kelamin" required onChange={handleChange}>
              <option value="">Pilih jenis kelamin</option>
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              onChange={handleChange} 
              placeholder="contoh@email.com"
            />
          </div>

          <div className="form-group">
            <label className="required">No HP</label>
            <input 
              type="text" 
              name="no_hp" 
              required 
              onChange={handleChange} 
              placeholder="08xxxxxxxxxx"
            />
          </div>

          <div className="form-group">
            <label>Pekerjaan</label>
            <input 
              type="text" 
              name="pekerjaan" 
              onChange={handleChange} 
              placeholder="Masukkan pekerjaan"
            />
          </div>

          <div className="form-group">
            <label className="required">Tanggal Kedatangan</label>
            <input
              type="date"
              name="tanggal_kedatangan"
              required
              min={currentDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full-width">
            <label className="required">Alamat</label>
            <textarea 
              name="alamat" 
              required 
              onChange={handleChange}
              placeholder="Masukkan alamat lengkap"
            ></textarea>
          </div>

          <div className="form-group">
            <label className="required">Keperluan</label>
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

          <div className="form-group">
            <label className="required">Dituju</label>
            <select name="dituju" required onChange={handleChange}>
              <option value="">Pilih Staff</option>
              <option value="budi">Budi Santoso</option>
              <option value="siti">Siti Rahmawati</option>
              <option value="agus">Agus Prasetyo</option>
              <option value="lina">Lina Kartini</option>
            </select>
          </div>

          {/* Subform Mitra Statistik */}
          {keperluan === "mitra_statistik" && (
            <div className="subform">
              <h3 className="subform-title">Detail Kegiatan Mitra Statistik</h3>
              <div className="form-content">
                <div className="form-group">
                  <label className="required">Jenis Kegiatan</label>
                  <select
                    name="jenis_kegiatan"
                    value={jenisKegiatan}
                    onChange={(e) => {
                      setJenisKegiatan(e.target.value);
                      handleChange(e);
                    }}
                    required
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
                    <label className="required">Seksi</label>
                    <select name="seksi" required onChange={handleChange}>
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
                      <label className="required">Pengirim</label>
                      <input 
                        type="text" 
                        name="pengirim" 
                        required 
                        onChange={handleChange} 
                        placeholder="Nama pengirim"
                      />
                    </div>
                    <div className="form-group">
                      <label className="required">Penerima</label>
                      <input 
                        type="text" 
                        name="penerima" 
                        required 
                        onChange={handleChange} 
                        placeholder="Nama penerima"
                      />
                    </div>
                    <div className="form-group">
                      <label className="required">Jenis Dokumen</label>
                      <input
                        type="text"
                        name="jenis_dokumen"
                        required
                        onChange={handleChange}
                        placeholder="Jenis dokumen"
                      />
                    </div>
                    <div className="form-group">
                      <label className="required">Jumlah Dokumen</label>
                      <input
                        type="number"
                        name="jumlah_dokumen"
                        required
                        onChange={handleChange}
                        placeholder="0"
                        min="1"
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Foto Dokumen</label>
                      <input
                        type="file"
                        name="foto_dokumen"
                        accept="image/*"
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          
          {/* Subform Konsultasi Statistik */}
          {keperluan === "konsultasi" && (
            <div className="subform">
              <h3 className="subform-title">Detail Konsultasi Statistik</h3>
              <div className="form-content">
                <div className="form-group full-width">
                  <label className="required">Topik Konsultasi</label>
                  <input
                    type="text"
                    name="topik_konsultasi"
                    required
                    onChange={handleChange}
                    placeholder="Masukkan topik konsultasi"
                  />
                </div>
                <div className="form-group full-width">
                  <label className="required">Deskripsi Kebutuhan</label>
                  <textarea
                    name="deskripsi_kebutuhan"
                    required
                    onChange={handleChange}
                    placeholder="Jelaskan kebutuhan konsultasi Anda secara detail"
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>
          )}
          
          {/* Subform Tamu Umum */}
          {keperluan === "tamu_umum" && (
            <div className="subform">
              <h3 className="subform-title">Detail Kunjungan</h3>
              <div className="form-content">
                <div className="form-group full-width">
                  <label className="required">Tujuan Kunjungan</label>
                  <textarea
                    name="tujuan_kunjungan"
                    required
                    onChange={handleChange}
                    placeholder="Jelaskan tujuan kunjungan Anda"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>
          )}
          
          <div className="button-group">
            <button type="reset" className="secondary-button">
              Reset
            </button>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Mengirim..." : "Kirim"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormTamu;