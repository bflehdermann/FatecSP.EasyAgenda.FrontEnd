import moment from "moment";
import React, { useEffect } from "react";
import { Editor, EditorState,convertToRaw, convertFromRaw  } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useState } from "react";

const Relatorio = ({ retorna, values, putRelatorio }) => {

   const [editorState, setEditorState] = useState(() => !values.relatorio_medico ? EditorState.createEmpty() : EditorState.createWithContent(convertFromRaw(JSON.parse(values.relatorio_medico))))

  const editor = React.useRef(null)
  const focusEditor=()=>{
    editor.current.focus()
  }

  const convertRelatorioToString = ()=>{
    const content = convertToRaw(editorState.getCurrentContent())
    return JSON.stringify(content)
  }

  return (
    <div>
      <div className="header">
        <span className="flex">
          <i className="pe-7s-angle-left-circle return" onClick={retorna}>
          </i>
          <p className="btn-voltar">voltar</p>
        </span>

        <h4>Relatório de Consulta</h4>


      </div>
      <div className="content">
        <label className="control-label">Nome do Paciente</label>
        <h5>{values.nome_paciente}</h5>

        <label className="control-label">Data da Consulta</label>
        <h5>{moment(values.data).format('DD/MM/YYYY')}</h5>

        <label className="control-label">Hora da Consulta</label>
        <h5>{values.hora_inicio}</h5>

        <label className="control-label">Relatório</label>
        <div className="editor" onClick={()=>focusEditor} >
          <Editor 
          className="editor" 
          editorState={editorState} 
          onChange={setEditorState}
          ref={editor}
          placeholder="Digite o relatório aqui!" />
        </div>
      </div>
      <br />
      
      <div className="btn btn-success btn-fill btn-wd" onClick={()=>putRelatorio(values.id,convertRelatorioToString())} >Enviar</div>
    </div>
  )
}

export default Relatorio