import React, { useState, useEffect } from 'react';
import { createGameMockPost } from '../../services/rawgApi';

const defaultFormState = {
  title: '',
  imageUrl: '',
  genre: '',
  platform: 'PC',
  status: 'Now Playing',
  rating: 5.0,
  playtime: 0,
};

export default function GameFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) {
  const [formData, setFormData] = useState(defaultFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const isEditing = Boolean(initialData && initialData.id);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        imageUrl: initialData.imageUrl || initialData.poster || initialData.coverImage || '',
        genre: initialData.genre || '',
        platform: initialData.platform || 'PC',
        status: initialData.status || 'Now Playing',
        rating: initialData.rating ?? 5.0,
        playtime: initialData.playtime ?? 0,
      });
    } else {
      setFormData(defaultFormState);
    }
    setToastMessage('');
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  /**
   * Task 7 POST Handler:
   * Sends an asynchronous HTTP POST request to API (mock endpoint)
   * satisfying Bab 7 requirement (Form sederhana yang mengirim data baru ke API menggunakan POST)
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const fallbackImage =
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80';

    const payload = {
      ...formData,
      imageUrl: formData.imageUrl.trim() || fallbackImage,
      coverImage: formData.imageUrl.trim() || fallbackImage,
      poster: formData.imageUrl.trim() || fallbackImage,
      rating: Number(formData.rating) || 5.0,
      playtime: Number(formData.playtime) || 0,
    };

    setIsSubmitting(true);

    try {
      // Simulate API POST request for Task 7
      await createGameMockPost(payload);
      setToastMessage(
        isEditing
          ? 'Perubahan berhasil disimpan!'
          : 'Berhasil dikirim ke API via HTTP POST (201 Created)!'
      );

      setTimeout(() => {
        onSubmit(payload);
        setIsSubmitting(false);
        onClose();
      }, 700);
    } catch (err) {
      console.warn('Gagal POST API, tetap menyimpan secara lokal:', err);
      onSubmit(payload);
      setIsSubmitting(false);
      onClose();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(5, 8, 14, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        padding: '1.25rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '540px',
          backgroundColor: '#0F1626',
          border: '1px solid #1E2B42',
          borderRadius: '16px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(139, 92, 246, 0.15)',
          overflow: 'hidden',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Toast Notification Banner */}
        {toastMessage && (
          <div
            style={{
              backgroundColor: '#10B981',
              color: '#FFFFFF',
              padding: '0.65rem 1rem',
              fontSize: '0.84rem',
              fontWeight: '600',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            <span>✓</span>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modal Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #1A263B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#FFFFFF', margin: 0 }}>
              {isEditing ? 'Edit Data Game' : 'Tambah Game Baru (HTTP POST)'}
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0.15rem 0 0 0' }}>
              {isEditing
                ? 'Perbarui rincian informasi game dalam katalog Arcadex Anda'
                : 'Kirim entri game baru ke API eksternal/mock secara asinkron (AJAX)'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            title="Tutup Modal"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94A3B8',
              backgroundColor: '#162136',
              border: '1px solid #23324E',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.backgroundColor = '#1F2E4A';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#94A3B8';
              e.currentTarget.style.backgroundColor = '#162136';
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '1.25rem 1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Title */}
            <div>
              <label
                htmlFor="game-title"
                style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#CBD5E1', marginBottom: '0.35rem' }}
              >
                Judul Game <span style={{ color: '#F43F5E' }}>*</span>
              </label>
              <input
                id="game-title"
                name="title"
                type="text"
                required
                placeholder="Contoh: The Witcher 3: Wild Hunt"
                value={formData.title}
                onChange={handleChange}
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  backgroundColor: '#131C2E',
                  border: '1px solid #22324D',
                  borderRadius: '8px',
                  padding: '0.55rem 0.85rem',
                  color: '#FFFFFF',
                  fontSize: '0.86rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#8B5CF6')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#22324D')}
              />
            </div>

            {/* Poster Image URL */}
            <div>
              <label
                htmlFor="game-image"
                style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#CBD5E1', marginBottom: '0.35rem' }}
              >
                URL Cover Image / Poster
              </label>
              <input
                id="game-image"
                name="imageUrl"
                type="url"
                placeholder="https://shared.cloudflare.steamstatic.com/..."
                value={formData.imageUrl}
                onChange={handleChange}
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  backgroundColor: '#131C2E',
                  border: '1px solid #22324D',
                  borderRadius: '8px',
                  padding: '0.55rem 0.85rem',
                  color: '#FFFFFF',
                  fontSize: '0.86rem',
                  outline: 'none',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#8B5CF6')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#22324D')}
              />
            </div>

            {/* Genre & Platform Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
              <div>
                <label
                  htmlFor="game-genre"
                  style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#CBD5E1', marginBottom: '0.35rem' }}
                >
                  Genre
                </label>
                <input
                  id="game-genre"
                  name="genre"
                  type="text"
                  placeholder="Contoh: Action RPG"
                  value={formData.genre}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    backgroundColor: '#131C2E',
                    border: '1px solid #22324D',
                    borderRadius: '8px',
                    padding: '0.55rem 0.85rem',
                    color: '#FFFFFF',
                    fontSize: '0.86rem',
                    outline: 'none',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#8B5CF6')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#22324D')}
                />
              </div>

              <div>
                <label
                  htmlFor="game-platform"
                  style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#CBD5E1', marginBottom: '0.35rem' }}
                >
                  Platform
                </label>
                <select
                  id="game-platform"
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    backgroundColor: '#131C2E',
                    border: '1px solid #22324D',
                    borderRadius: '8px',
                    padding: '0.55rem 0.85rem',
                    color: '#FFFFFF',
                    fontSize: '0.86rem',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <option value="PC">PC</option>
                  <option value="PS5">PS5</option>
                  <option value="Switch">Switch</option>
                  <option value="Steam Deck">Steam Deck</option>
                  <option value="Xbox Series X">Xbox Series X</option>
                </select>
              </div>
            </div>

            {/* Status, Rating & Playtime */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.9fr 0.9fr', gap: '0.85rem' }}>
              <div>
                <label
                  htmlFor="game-status"
                  style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#CBD5E1', marginBottom: '0.35rem' }}
                >
                  Status
                </label>
                <select
                  id="game-status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    backgroundColor: '#131C2E',
                    border: '1px solid #22324D',
                    borderRadius: '8px',
                    padding: '0.55rem 0.85rem',
                    color: '#FFFFFF',
                    fontSize: '0.86rem',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <option value="Now Playing">Now Playing</option>
                  <option value="Completed">Completed</option>
                  <option value="Backlog">Backlog</option>
                  <option value="Wishlist">Wishlist</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="game-rating"
                  style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#CBD5E1', marginBottom: '0.35rem' }}
                >
                  Rating (1-5)
                </label>
                <input
                  id="game-rating"
                  name="rating"
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    backgroundColor: '#131C2E',
                    border: '1px solid #22324D',
                    borderRadius: '8px',
                    padding: '0.55rem 0.85rem',
                    color: '#FFFFFF',
                    fontSize: '0.86rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="game-playtime"
                  style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#CBD5E1', marginBottom: '0.35rem' }}
                >
                  Playtime (Jam)
                </label>
                <input
                  id="game-playtime"
                  name="playtime"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.playtime}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    backgroundColor: '#131C2E',
                    border: '1px solid #22324D',
                    borderRadius: '8px',
                    padding: '0.55rem 0.85rem',
                    color: '#FFFFFF',
                    fontSize: '0.86rem',
                    outline: 'none',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Form Action Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '0.75rem',
              marginTop: '1.75rem',
              paddingTop: '1rem',
              borderTop: '1px solid #1A263B',
            }}
          >
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              style={{
                padding: '0.55rem 1.15rem',
                borderRadius: '8px',
                backgroundColor: '#162136',
                border: '1px solid #23324E',
                color: '#94A3B8',
                fontSize: '0.84rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '0.55rem 1.35rem',
                borderRadius: '8px',
                backgroundColor: '#8B5CF6',
                backgroundImage: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                color: '#FFFFFF',
                fontSize: '0.84rem',
                fontWeight: '600',
                boxShadow: '0 2px 12px rgba(139, 92, 246, 0.45)',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1,
                transition: 'all 0.2s',
              }}
            >
              {isSubmitting
                ? 'Mengirim ke API...'
                : isEditing
                ? 'Simpan Perubahan'
                : 'Tambah Game (POST)'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
