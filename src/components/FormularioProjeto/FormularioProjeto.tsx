import React from "react";
import { Box, Button, Collapse, Divider, FormControlLabel, FormGroup, Grid, Paper, Portal, Switch, TextField, Typography } from "@mui/material";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { DatePicker, LocalizationProvider, MobileDateTimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import ptBR from 'date-fns/locale/pt-BR';

import NumberFormat, { NumberFormatProps } from 'react-number-format';

import { styled } from '@mui/material/styles';

interface IProps {
    submit: Function
};

const FormularioProjeto: React.FC<IProps> = ({ submit }): React.ReactElement => {

    const validationSchema = yup.object({
        nome: yup.string().required('O nome do projeto está vazio'),

    });

    const initialValues = {
        nome: '',
        custo: '',
        descricao: '',
        tempo: ''
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            submit({ ...values, dataLimite });
            console.log(AdapterDateFns);
            formik.resetForm();
        },
    });

    const [dataLimite, setDataLimite] = React.useState<Date | null>(new Date());
    const [ativarDataLimite, setAtivarDataLimite] = React.useState<boolean>(false);
    const [cadastrarAgenda, setCadastrarAgenda] = React.useState<boolean>(false);


    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(0),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(-1),
        marginLeft: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <Paper sx={{ padding: '20px 20px 5px 5px' }} elevation={0} >
            <Typography variant="h4" component="h4" paddingLeft={1} >Cadastro de projetos</Typography>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1 }
                }}
                noValidate
                autoComplete="off"
                onSubmit={formik.handleSubmit}
            >
                <div>
                    <TextField
                        id="formulario-projeto-nome"
                        label="Nome do Projeto"
                        multiline
                        maxRows={4}
                        fullWidth
                        placeholder="Digite o nome do projeto"
                        name="nome"
                        value={formik.values.nome}
                        onChange={formik.handleChange}
                        error={formik.touched.nome && Boolean(formik.errors.nome)}
                        helperText={formik.touched.nome && formik.errors.nome}
                        size="small"
                    />
                    <TextField
                        id="formulario-projeto-descricao"
                        label="Descrição do projeto"
                        multiline
                        // maxRows={8}
                        rows={4}
                        fullWidth
                        placeholder="Digite a descrição do projeto"
                        // defaultValue="Default Value"
                        name="descricao"
                        value={formik.values.descricao}
                        onChange={formik.handleChange}
                        error={formik.touched.descricao && Boolean(formik.errors.descricao)}
                        helperText={formik.touched.descricao && formik.errors.descricao}
                        size="small"
                    />

                    <Grid container spacing={2}>
                        <Grid item xs={3} >
                            <TextField
                                // id="formulario-projeto-tempo"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                  }}
                                label="Mêses"
                                fullWidth
                                // placeholder="Tempo previsto"
                                InputProps={{ inputProps: { min: "0", step: "1" } }}
                                name="tempo"
                                value={formik.values.tempo}
                                onChange={formik.handleChange}
                                error={formik.touched.tempo && Boolean(formik.errors.tempo)}
                                helperText={formik.touched.tempo && formik.errors.tempo}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={3} >
                            <TextField
                                // id="formulario-projeto-tempo"
                                label="Dias"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                  }}
                                fullWidth
                                InputProps={{ inputProps: { min: "0", max: "30", step: "1" } }}
                                // placeholder="Digite o tempo provavelmente gasto no projeto"
                                name="tempo"
                                value={formik.values.tempo}
                                onChange={formik.handleChange}
                                error={formik.touched.tempo && Boolean(formik.errors.tempo)}
                                helperText={formik.touched.tempo && formik.errors.tempo}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={3} >
                            <TextField
                                // id="formulario-projeto-tempo"
                                label="Horas"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                  }}
                                fullWidth
                                InputProps={{ inputProps: { min: "0", max: "23", step: "1" } }}
                                // placeholder="Digite o tempo provavelmente gasto no projeto"
                                name="tempo"
                                value={formik.values.tempo}
                                onChange={formik.handleChange}
                                error={formik.touched.tempo && Boolean(formik.errors.tempo)}
                                helperText={formik.touched.tempo && formik.errors.tempo}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={3} >

                            <TextField
                                // id="formulario-projeto-tempo"
                                label="Minutos"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                  }}
                                fullWidth
                                InputProps={{ inputProps: { min: "0", max: "59", step: "1" } }}
                                // placeholder="Digite o tempo provavelmente gasto no projeto"
                                name="tempo"
                                value={formik.values.tempo}
                                onChange={formik.handleChange}
                                error={formik.touched.tempo && Boolean(formik.errors.tempo)}
                                helperText={formik.touched.tempo && formik.errors.tempo}
                                size="small"
                            />
                        </Grid>
                    </Grid>



                    <NumberFormat
                        value={formik.values.custo}
                        displayType={'input'}
                        thousandSeparator="."
                        decimalSeparator=","
                        allowNegative={false}
                        allowedDecimal=","
                        decimalScale={2}
                        defaultValue={0}
                        // dir="rtl"
                        name="custo"
                        customInput={props => <TextField {...props} size="small" />}

                        onBlur={formik.handleChange}

                        prefix={'R$ '}


                        id="formulario-projeto-custo"
                        label="Custo previsto (R$)"
                        multiline
                        maxRows={4}
                        fullWidth
                        placeholder="Digite o custo previsto do projeto"
                        error={formik.touched.custo && Boolean(formik.errors.custo)}
                        helperText={formik.touched.tempo && formik.errors.tempo}
                    />


                    <Item>
                        <Grid container xs>
                            <Grid item xs={6} alignContent="baseline">
                                <FormControlLabel control={
                                    <Switch name="ativarDataLimite" checked={ativarDataLimite} onChange={(event) => setAtivarDataLimite(event.target.checked)} />
                                } label="Ativar data Limite" />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControlLabel control={
                                    <Switch name="cadastrarAgenda" checked={cadastrarAgenda} onChange={(event) => setCadastrarAgenda(event.target.checked)} />
                                } label="Cadastrar agenda" />
                            </Grid>
                        </Grid>
                    </Item>
                    <Collapse in={ativarDataLimite} >
                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
                            <MobileDateTimePicker
                                disabled={false}
                                label="Data limite"
                                value={dataLimite}
                                onChange={(data) => {
                                    setDataLimite(data);
                                }}
                                renderInput={(params) => { params['size'] = 'small'; return <TextField {...params} /> }}
                            />

                        </LocalizationProvider>
                    </Collapse>

                    <Collapse in={cadastrarAgenda} >
                        <Grid container xs>
                            <Grid item xs={6} alignContent="baseline">
                                <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
                                    <MobileDateTimePicker
                                        disabled={false}
                                        label="Inicio agenda"
                                        value={dataLimite}
                                        
                                        onChange={(data) => {
                                            setDataLimite(data);
                                        }}
                                        renderInput={(params) => { params['size'] = 'small'; return <TextField {...params} /> }}

                                    />

                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={6} alignContent="baseline">
                                <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
                                    <MobileDateTimePicker
                                        disabled={false}
                                        label="Fim Agenda"
                                        value={dataLimite}
                                        onChange={(data) => {
                                            setDataLimite(data);
                                        }}
                                        renderInput={(params) => { params['size'] = 'small'; return <TextField {...params} /> }}
                                    />

                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                    </Collapse>
                </div>
                <Button type="submit" sx={{ margin: '20px 20px 5px 5px' }} fullWidth variant="contained" size="medium">Salvar</Button>
            </Box>
        </Paper>
    );

}

export default FormularioProjeto;