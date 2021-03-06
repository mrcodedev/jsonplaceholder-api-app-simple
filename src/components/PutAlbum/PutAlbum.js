import { useState, useRef } from "react";
import { putAlbum } from "../../services/AlbumsService";
import "./PutAlbum.css";

const PutAlbum = () => {
  const formRef = useRef(null);
  const [putData, setPutData] = useState();
  const [loading, setLoading] = useState(false);

  const sendForm = (event) => {
    event.preventDefault();
    let formData = new FormData(formRef.current);
    const putData = {
      id: formData.get("id"),
      userId: formData.get("userId"),
      title: formData.get("title"),
    };
    setLoading(true);
    putAlbum(putData).then((response) => {
      setPutData(response);
      console.log(response);
      setLoading(false);
    });
  };

  return (
    <div className="wrapper-create">
      <h1>Put Album</h1>
      {loading && <div className="loading">Cargando...</div>}
      {!loading && (
        <div className="create-album">
          <form id="formPost" ref={formRef} onSubmit={sendForm}>
            <input name="id" placeholder="Id" />
            <input name="userId" placeholder="userId" />
            <input name="title" placeholder="Title" />
            <button type="submit">Put Album</button>
          </form>
        </div>
      )}
      {!loading && putData && (
        <div>
          <h2>PUT</h2>
          <div className="put-result">
            <div>
              <strong>Id creada: </strong>
              {putData.id}
            </div>
            <div>
              <strong>UserId: </strong>
              {putData.userId}
            </div>
            <div>
              <strong>Título: </strong>
              {putData.title}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PutAlbum;
