import React from 'react'
export default function Table({ children }) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">{children}</table>
      </div>
    );
  }
