import React, { useState } from "react";

function SegmentManager({ segments, setSegments }) {
  const [editSegment, setEditSegment] = useState(null);
  const [formData, setFormData] = useState({ segmentText: "", segColor: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError("");
  };

  const validateForm = () => {
    if (!formData.segmentText.trim() || !formData.segColor) {
      setError("Both segment text and color are required.");
      return false;
    }
    return true;
  };

  const handleAdd = () => {
    if (validateForm()) {
      setSegments([...segments, { id: Date.now(), ...formData }]);
      setFormData({ segmentText: "", segColor: "" });
    }
  };

  const handleUpdate = (id) => {
    if (validateForm()) {
      setSegments(
        segments.map((seg) => (seg.id === id ? { ...seg, ...formData } : seg))
      );
      setEditSegment(null);
      setFormData({ segmentText: "", segColor: "" });
    }
  };

  const handleEdit = (segment) => {
    setEditSegment(segment);
    setFormData({
      segmentText: segment.segmentText,
      segColor: segment.segColor,
    });
    setError("");
  };

  const handleDelete = (id) => {
    setSegments(segments.filter((seg) => seg.id !== id));
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg h-full overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Segment Manager</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        {editSegment ? (
          <div className="space-y-2">
            <label className="block">
              Segment Text:
              <input
                type="text"
                name="segmentText"
                value={formData.segmentText}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                placeholder="Enter segment text"
              />
            </label>
            <label className="block">
              Segment Color:
              <input
                type="color"
                name="segColor"
                value={formData.segColor}
                onChange={handleChange}
                className="mt-1 border-none"
              />
            </label>
            <button
              onClick={() => handleUpdate(editSegment.id)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Update Segment
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <label className="block">
              Segment Text:
              <input
                type="text"
                name="segmentText"
                value={formData.segmentText}
                onChange={handleChange}
                placeholder="New segment text"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </label>
            <label className="block">
              Segment Color:
              <input
                type="color"
                name="segColor"
                value={formData.segColor}
                onChange={handleChange}
                className="mt-1 border-none"
              />
            </label>
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add Segment
            </button>
          </div>
        )}
      </div>

      <ul className="space-y-2">
        {segments.map((segment) => (
          <li
            key={segment.id}
            className="flex items-center justify-between p-2 border border-gray-200 rounded"
          >
            <div className="flex items-center space-x-4">
              <div
                className="w-6 h-6 rounded"
                style={{ backgroundColor: segment.segColor }}
              ></div>
              <span>{segment.segmentText}</span>
            </div>
            <div>
              <button
                onClick={() => handleEdit(segment)}
                className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(segment.id)}
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SegmentManager;
