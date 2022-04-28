import "./App.css";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import http from "./http-common";

function Formulario() {
  const { register, handleSubmit } = useForm();
  const [dados, setDados] = useState({});

  const onSubmit = (data) => {

    console.log(JSON.stringify(data));
    setDados(JSON.stringify(data));
    http
      .post(
        "/cadastro",
        {
          cpfCnpj: data.cpfCnpj,
          senha: data.senha,
          nome: data.nome,
          sobreNome: data.sobreNome,
          razaoSocial: data.razaoSocial,
          dtNascFund: data.dtNascFund,
          dtCriacao: data.dtCriacao,
        }
      )
      .then(function (response) {
        console.log(response);
        alert('SUCESSO AO CADASTRAR ' + data.nome)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <section className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="cpfCnpj">CPF ou CNPJ:</label>
            <input {...register("cpfCnpj")} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="senha">Senha:</label>
            <input {...register("senha")} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input {...register("nome")} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="sobreNome">Sobre-nome:</label>
            <input {...register("sobreNome")} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="razaoSocial">Razão Social:</label>
            <input {...register("razaoSocial")} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="dtNascFund">Data de Nascimento ou Fundação:</label>
            <input
              type={"date"}
              {...register("dtNascFund")}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              {...register("dtCriacao")}
              type={"hidden"}
              value={"2022-03-05"}
            />
          </div>
          <input type="submit" />
        </form>
      </section>
    </div>
  );
}

export default Formulario;
