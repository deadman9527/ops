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
                                "column": {
                                    "type":"string",
                                    "required":false
                                },
                                "column_id": {
                                    "type":"string",
                                    "required":false
                                },
                                "end_time": {
                                    "type":"string",
                                    "required":false
                                },
                                "id": {
                                    "type":"string",
                                    "required":false
                                },
                                "locked": {
                                    "type":"string",
                                    "required":false
                                },
                                "name": {
                                    "type":"string",
                                    "required":false
                                },
                                "sort": {
                                    "type":"string",
                                    "required":false
                                },
                                "plan_end_time": {
                                    "type":"string",
                                    "required":false
                                },
                                "plan_start_time": {
                                    "type":"string",
                                    "required":false
                                },
                                "start_time": {
                                    "type":"string",
                                    "required":false
                                },
                                "stop": {
                                    "type":"string",
                                    "required":false
                                }
                            }
                        }


                    },
                    "page": {
                        "type":"number",
                        "required":false
                    },
                    "pagesize": {
                        "type":"number",
                        "required":false
                    },
                    "responseInfo": {
                        "type":"object",
                        "required":true,
                        "properties":{
                            "reasons": {
                                "type":"object",
                                "required":false,
                                "properties":{
                                    "code": {
                                        "type":"string",
                                        "required":false
                                    },
                                    "msg": {
                                        "type":"string",
                                        "required":false
                                    },
                                    "type": {
                                        "type":"number",
                                        "required":false
                                    }
                                }
                            }
                        }
                    },
                    "total_pages": {
                        "type":"number",
                        "required":false
                    },
                    "total": {
                        "type":"number",
                        "required":false
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
