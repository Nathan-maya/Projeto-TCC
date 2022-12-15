import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { autoComplete } from '../../helpers/autoComplete';
import formatDate from '../../helpers/formatDate';
import { addMissing } from '../../API/apiCalls';
import { clearFile, uploadFile } from '../../redux/fileSlice';
import {
  Button,
  Container,
  Forms,
  Input,
  Label,
  Li,
  Mistakes,
  Success,
  Ul,
  Wrapper,
} from './style';

const schema = Yup.object().shape({
  nome: Yup.string()
    .required('Por favor, insira um nome!')
    .matches(
      /^(([A-Za-z]+[-']?)*([A-Za-z]+)?\s)+([A-Za-z]+[-']?)*([A-Za-z]+)?$/,
      'Digite um nome válido',
    ),
  idade: Yup.string()
    .required('Por favor, insira a idade!')
    .matches(/^[0-9]{0,2}$/, 'Digite um número válido'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('Por favor, insira o e-mail de contato!'),
  telefone: Yup.string()
    .required('Por favor, insira um telefone de contato')
    .matches(
      /^([0-9]{2})([0-9]{4,5})([0-9]{4})$/,
      'Por favor, insira um telefone válido: (11)989999999',
    ),
  endereco: Yup.string()
    .required('Por favor, insira um endereço!')
    .matches(/^[a-zA-Z0-9\s,.'-]{3,}$/, 'Por favor, insira um endereço válido'),
  data: Yup.date().required('Por favor, insira uma data'),
  municipio: Yup.string().required('Por favor, o municipio!'),
  img: Yup.mixed().required('Field is required'),
});

const RegisterMissing = () => {
  const [inputs, setInputs] = useState({});
  const [files, setFiles] = useState([]);
  const [municipio, setMunicipio] = useState([]);
  const [idInputMunicipio, setIdInputMunicipio] = useState('');
  const selector = useSelector((state) => {
    return state.files;
  });
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const onFileChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      setFiles((prevState) => [...prevState, newImage]);
    }
  };

  const handleChange = (e) => {
    setMunicipio((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(municipio);
  };

  const handleClick = async (values) => {
    // values.date = formatDate(values.date)
    setInputs(values);
    if (selector.files.length > 0) {
      dispatch(clearFile());
    }
    await uploadFile(files, dispatch);
  };

  useEffect(() => {
    console.count('render');
    if (selector.files.length > 0 && Object.keys(inputs).length >= 5) {
      console.log(inputs);
      const missing = { ...inputs, img: selector.files, ...municipio };
      missing.data = formatDate(missing.data);

      async function fetchUpload() {
        console.log('realizando fetch');
        await addMissing(missing, dispatch);
      }
      console.log('chamando fetchUpload');
      fetchUpload();

      Array.from(document.querySelectorAll('input')).forEach(
        (input) => (input.value = ''),
      );
      setInputs('');
      setFiles([]);
      setSuccess(true);
    }
  }, [dispatch, inputs, municipio, selector.files]);

  //AUTOCOMPLETE
  const [showSuggestions, setShowSuggestions] = useState(false);
  const getAllSuggestions = autoComplete();
  const suggestions = getAllSuggestions.filter((option) =>
    option.toLowerCase().includes(municipio.municipio?.toLowerCase()),
  );

  const handleSuggestionClick = (suggestion) => {
    municipio.municipio = suggestion;
    idInputMunicipio.value = suggestion;
    setShowSuggestions(false);
  };

  return (
    <Container>
      <Wrapper
        validationSchema={schema}
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          nome: '',
        }}
        onSubmit={(values, { resetForm }) => {
          handleClick(values);
          resetForm();
        }}
      >
        {(props) => (
          <Forms>
            <Label htmlFor="nome">Nome Completo: </Label>
            {props.errors.nome && <Mistakes>{props.errors.nome}</Mistakes>}
            <Input htmlFor="nome" name="nome" type="text" />

            <Label htmlFor="idade">Idade: </Label>
            {props.errors.idade && <Mistakes>{props.errors.idade}</Mistakes>}
            <Input htmlFor="idade" name="idade" type="text" />

            <Label htmlFor="email">Email de contato: </Label>
            {props.errors.email && <Mistakes>{props.errors.email}</Mistakes>}
            <Input htmlFor="email" name="email" type="email" />
            <Label htmlFor="telefone">Telefone de contato: </Label>
            {props.errors.telefone && (
              <Mistakes>{props.errors.telefone}</Mistakes>
            )}
            <Input htmlFor="telefone" name="telefone" type="telefone" />

            <Label htmlFor="endereco">Endereço: </Label>
            {props.errors.endereco && (
              <Mistakes>{props.errors.endereco}</Mistakes>
            )}
            <Input htmlFor="endereco" name="endereco" type="text" />

            <Label htmlFor="municipio">Municipio: </Label>
            {props.errors.municipio && (
              <Mistakes>{props.errors.municipio}</Mistakes>
            )}
            <Input
              htmlFor="municipio"
              name="municipio"
              type="text"
              onFocus={(e) => {
                setIdInputMunicipio(e.target);
                setShowSuggestions(true);
              }}
              onChange={(e) => {
                props.handleChange(e);
                handleChange(e);
              }}
              value={idInputMunicipio.value || ''}
            />

            {suggestions.length < 50 &&
              suggestions.length > 0 &&
              showSuggestions && (
                <Ul visible="visible">
                  {suggestions.map((suggestion, index) => (
                    <Li
                      onClick={() => handleSuggestionClick(suggestion)}
                      key={index}
                    >
                      {suggestion}
                    </Li>
                  ))}
                </Ul>
              )}

            <Label htmlFor="data">Data do desaparecimento: </Label>
            {props.errors.data && <Mistakes>{props.errors.data}</Mistakes>}
            <Input htmlFor="data" name="data" type="date" />

            <Label htmlFor="img">Fotos: </Label>
            {props.errors.img && <Mistakes>{props.errors.img}</Mistakes>}
            <Input
              htmlFor="img"
              name="img"
              type="file"
              multiple
              onChange={(e) => {
                props.handleChange(e);
                onFileChange(e);
              }}
            />

            <Button type="submit">Enviar</Button>

            {success ? (
              <Success>
                Cadastrado com sucesso em nosso banco de dados! Caso o
                identifiquemos, entraremos em contato!
              </Success>
            ) : (
              false
            )}
          </Forms>
        )}
      </Wrapper>
    </Container>
  );
};

export default RegisterMissing;
