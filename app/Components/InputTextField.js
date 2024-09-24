"use client"
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, TextField } from "@mui/material";
import { BiShow, BiHide } from "react-icons/bi";
import { amber, green, purple } from "@mui/material/colors";

const ValidationTextField = styled(TextField)({
  "& input:valid + fieldset": {
    borderColor: green[800],
    borderWidth: 3,
    borderRadius: 10
  },
  "&:hover:valid + fieldset": {
    borderColor: amber[500]
  },
  "& input:valid:focus + fieldset": {
    borderLeftWidth: 6,
    borderColor: purple[700],
    color: 'white',
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: amber[500],
    }
  }
});

const color=(f) => {
  return {
  m: 1,
  input: {
    color: f ? f : 'white',
  },
  label: {
    color: f ? f : 'white',
  },
  fieldset: {
    border: "2px solid purple",
    borderRadius: "16px",
    boxShadow: "purple 0px 5px 15px"
    }
  };
}

const Multiline = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: '100%'
      }}
    >
      <ValidationTextField
        label={props.errors ? props.errors.message : props.label}
        required={props.required}
        error={!props.errors ? false : true}
        type={props.type}
        onChange={(e) => props.onChange(e.target.value)}
        sx={color()}
        variant="outlined"
        defaultValue={props.defaultValue}
        multiline
        rows={props.rows}
      />
    </Box >
  );
};

const Password = (props) => {
  const [showPass, setShowPass] = useState(false);
  const errorhandle = () => {
    if (props.errors === undefined) {
      return false;
    } else return true
  }
  const passWordIcon = () =>
    showPass ? (
      <BiHide size={40} onClick={() => setShowPass(false)} style={{ position: 'absolute', right: '5%', cursor: 'pointer', zIndex: 9, mr: 1 }} />
    ) : (
      <BiShow size={40} onClick={() => setShowPass(true)} style={{ position: 'absolute', right: '5%', cursor: 'pointer', zIndex: 9, mr: 1 }} />
    );
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: '100%'
      }}
    >
      <ValidationTextField
        label={props.errors ? props.errors.message : props.label}
        required
        fullWidth
        error={errorhandle()}
        onChange={(e) => props.onChange(e.target.value)}
        type={showPass ? "text" : "password"}
        variant="outlined"
        defaultValue={props.defaultValue}
        sx={color()}
      />
      {passWordIcon()}
    </Box >
  );
};

const TextInput = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
      }}
    >
      <ValidationTextField
        fullWidth
        label={props.errors ? props.errors.message : props.label}
        required={props.required}
        error={!props.errors ? false : true}
        type={props.type}
        onChange={(e) => props.onChange(e.target.value)}
        sx={color(props.tekstFarve)}
        variant="outlined"
        defaultValue={props.defaultValue}
      />
    </Box>
  );
};

const SelectText = ({ children, type, defaultValue, value, onChange, required, errors, label, id, textAlign }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: textAlign,
        position: 'relative',
        width: '100%'
      }}
    >
      <ValidationTextField
        fullWidth
        id={id}
        label={errors ? errors.message : label}
        required={required}
        error={!errors ? false : true}
        margin="normal"
        select
        onChange={onChange}
        value={value}
        sx={color}
        variant="outlined"
        defaultValue={defaultValue}
      >
        {children}
      </ValidationTextField>
    </Box>
  )
}

export default function Text({ children, type, defaultValue, value, onChange, required, errors, label, id, rows, textAlign, tekstFarve }) {
  const inputType = (type) => {
    switch (type) {
      case "multiline":
        return <Multiline errors={errors} label={label} onChange={onChange} rows={rows} defaultValue={defaultValue} />;
      case "password":
        return <Password errors={errors} label={label} onChange={onChange} defaultValue={defaultValue} />;
      case "select":
        return <SelectText errors={errors} label={label} onChange={onChange} defaultValue={defaultValue} required={required} value={value} id={id} textAlign={textAlign}>{children}</SelectText>
      default:
        return <TextInput errors={errors} label={label} onChange={onChange} defaultValue={defaultValue} required={required} tekstFarve={tekstFarve} />;
    }
  };

  return <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>{inputType(type)}</Box>;
}