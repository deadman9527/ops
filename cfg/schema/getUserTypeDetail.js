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
                                "required":true
                            },
                            "mob_ag": {
                                "type":"string",
                                "required":true
                            },
                            "mob_first": {
                                "type":"string",
                                "required":true
                            },
                            "pc_ag": {
                                "type":"string",
                                "required":true
                            },
                            "pc_first": {
                                "type":"string",
                                "required":true
                            },
                            "port": {
                                "type":"string",
                                "required":true
                            },
                            "type": {
                                "type":"string",
                                "required":true
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
