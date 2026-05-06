import { useState } from "react";
import supabase  from "./supabase.js";

const FactureModal = ({ isOpen, onClose}) => {
  const [client, setClient] = useState("");
  const [object, setObject] = useState("");
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("draft");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    const { data, error } = await supabase.from("invoices").insert([
      {
        client_name: client,
        object,
        total,
        status,
      },
    ]);

    if (error) {
      console.log(error);
      return;
    }

    // onSuccess(); // refresh table
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Nouvelle Facture</h2>

        <input
          placeholder="Client"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />

        <textarea
          placeholder="Objet"
          value={object}
          onChange={(e) => setObject(e.target.value)}
        />

        <input
          type="number"
          placeholder="Total"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="draft">Brouillon</option>
          <option value="sent">Envoyée</option>
          <option value="paid">Payée</option>
        </select>

        <div className="modal-actions">
          <button onClick={onClose}>Annuler</button>
          <button onClick={handleSubmit}>Créer</button>
        </div>

      </div>
    </div>
  );
};

export default FactureModal;