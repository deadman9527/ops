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
                            "code": {
                                "type":"string",
                                "required":false
                            },
                            "end_month": {
                                "type":"string",
                                "required":false
                            },
                            "end_year": {
                                "type":"string",
                                "required":false
                            },
                            "start_month": {
                                "type":"string",
                                "required":false
                            },
                            "start_year": {
                                "type":"string",
                                "required":false
                            },
                            "sex": {
                                "type":"string",
                                "required":false
                            },
                            "type": {
                                "type":"string",
                                "required":false
                            },
                            "apply_status": {
                                "type":"string",
                                "required":false
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
