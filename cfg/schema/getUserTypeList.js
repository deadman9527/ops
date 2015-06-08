cobra.add({
        "type":"object",
        "required":true,
        "properties":{
            "responseBody": {
                "type":"object",
                "required":true,
                "properties":{
                    "data": {
                        "type":"object",
                        "required":true,
                        "properties":{
                            "name": {
                                "type":"string",
                                "required":true
                            },
                            "usergroup": {
                                "type":"array",
                                "required":true,
                                "items":
                                {
                                    "type":"object",
                                    "required":true,
                                    "properties":{
                                        "apply": {
                                            "type":"string",
                                            "required":true
                                        },
                                        "apply_status": {
                                            "type":"string",
                                            "required":true
                                        },
                                        "code": {
                                            "type":"string",
                                            "required":true
                                        },
                                        "desc": {
                                            "type":"string",
                                            "required":true
                                        },
                                        "id": {
                                            "type":"string",
                                            "required":true
                                        },
                                        "type": {
                                            "type":"string",
                                            "required":true
                                        }
                                    }
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
