cobra.add({
        "type":"object",
        "required":true,
        "properties":{
            "responseBody": {
                "type":"object",
                "required":true,
                "properties":{
                    "data": {
                        "type":"array",
                        "required":false,
                        "items":
                        {
                            "type":"object",
                            "required":false,
                            "properties":{
                                "age_stage_code": {
                                    "type":"string",
                                    "required":false
                                },
                                "age_stage": {
                                    "type":"string",
                                    "required":false
                                },
                                "apply": {
                                    "type":"string",
                                    "required":false
                                },
                                "apply_status": {
                                    "type":"string",
                                    "required":false
                                },
                                "code": {
                                    "type":"string",
                                    "required":false
                                },
                                "desc": {
                                    "type":"string",
                                    "required":false
                                },
                                "id": {
                                    "type":"string",
                                    "required":false
                                },
                                "name": {
                                    "type":"string",
                                    "required":false
                                },
                                "port_code": {
                                    "type":"string",
                                    "required":false
                                },
                                "port": {
                                    "type":"string",
                                    "required":false
                                },
                                "rule_code": {
                                    "type":"string",
                                    "required":false
                                },
                                "rule": {
                                    "type":"string",
                                    "required":false
                                },
                                "user_type": {
                                    "type":"array",
                                    "required":false
                                }
                            }
                        }


                    },
                    "responseInfo": {
                        "type":"object",
                        "required":true,
                        "properties":{
                            "reasons": {
                                "type":"object",
                                "required":true,
                                "properties":{
                                    "code": {
                                        "type":"string",
                                        "required":true
                                    },
                                    "msg": {
                                        "type":"string",
                                        "required":true
                                    },
                                    "type": {
                                        "type":"number",
                                        "required":true
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "statusCode": {
                "type":"number",
                "required":true
            }
        }
    }
);
