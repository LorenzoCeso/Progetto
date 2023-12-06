sap.ui.define
([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox) 
    {
        "use strict";

        return Controller.extend("zacademy.crudoperator.controller.HomePage", 
        {
            onInit: function () 
            {

            },
            //Collegamento alla pagina di modifica con aggiunta di busy dialog(Edit.View)
            oViewDetails: function() 
            {
                var oBusyDialog = this.byId("busyDialog");
                oBusyDialog.open(); // Mostra il busy dialog prima del reindirizzamento
                setTimeout(function() 
                {
                oBusyDialog.close();
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteEdit"); 
                }.bind(this),1000);
            },  
            //Collegamento    
            oCreate: function()
            {
                
                var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Z_ACADEMY_SRV");
                var sEntity = "/z_rubricaSet";
                
                var Nome = this.getView().byId("Nome").getValue();
                var Cognome = this.getView().byId("Cognome").getValue();
                var Email = this.getView().byId("Email").getValue();
                var Telefono = this.getView().byId("Telefono").getValue();
                var Paese= this.getView().byId("Paese").getValue();
                var Citta = this.getView().byId("Citta").getValue();
                var Provincia = this.getView().byId("Provincia").getValue();
                var Indirizzo = this.getView().byId("Indirizzo").getValue();

                if( Telefono.length > 10)
                {
                    MessageBox.error("Inserire max 10 numeri")
                    var NomeINput = this.getView().byId("Telefono");
                    NomeINput.setValue("");
                    
                }; 

                var flag = false;

                if (Nome == "" || Nome == undefined) {
                    MessageBox.error("Inserire Nome per registrare");
                    flag = true;
                }
                if (Cognome == "" || Cognome == undefined) {
                    MessageBox.error("Inserire Cognome per registrare");

                    flag = true;
                }
                
                var oData = 
                {
                    "Nome": Nome,
                    "Cognome": Cognome,
                    "Email": Email,
                    "Telefono": Telefono,
                    "Paese": Paese,
                    "Citta": Citta,
                    "Provincia": Provincia,
                    "Indirizzo": Indirizzo
                };

                oModel.create(sEntity, oData, 
                {
                    success: function (res) {
                        MessageBox.success("Registrazione con successo");
                        var oBusyDialog = this.byId("busyDialog");
                        oBusyDialog.open(); // Mostra il busy dialog prima del reindirizzamento
                        setTimeout(function () {
                            oBusyDialog.close();
                        }.bind(this), 1000);
                    },
                    error: function(err)
                    {
                            MessageBox.error();
                            console.log(err)
                    }
                });   
            },

            oReset: function()
            {
                var NomeINput = this.getView().byId("Nome");
                NomeINput.setValue("");
                var NomeINput = this.getView().byId("Cognome");
                NomeINput.setValue("");
                var NomeINput = this.getView().byId("Email");
                NomeINput.setValue("");
                var NomeINput = this.getView().byId("Telefono");
                NomeINput.setValue("");
                var NomeINput = this.getView().byId("Paese");
                NomeINput.setValue("");
                var NomeINput = this.getView().byId("Citta");
                NomeINput.setValue("");
                var NomeINput = this.getView().byId("Provincia");
                NomeINput.setValue("");
                var NomeINput = this.getView().byId("Indirizzo");
                NomeINput.setValue("");
            }        
        })            
    }
);    
                


