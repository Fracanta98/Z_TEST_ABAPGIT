// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/Filter",
//     "sap/ui/model/FilterOperator",
//     "sap/m/MessageToast"

// ], (Controller, Filter, FilterOperator, MessageToast) => {
//     "use strict";

//     return Controller.extend("zitsstockoverview.controller.MainView", {
//         onInit() {
//         },



        
// _materialFilterTimer: null,

//     // onMaterialLiveChange: function (oEvent) {
//     //   const sValue = oEvent.getParameter("newValue") || "";

//     //   clearTimeout(this._materialFilterTimer);
//     //   this._materialFilterTimer = setTimeout(() => {
//     //     this._applyMaterialFilter(sValue);
//     //   }, 300); 
//     // },


    





//   //=================== MATERIAL FILTER ========================================
//     onMaterialSearch: function (oEvent) {
//       const sValue = oEvent.getParameter("query") || "";
//       this._applyMaterialFilter(sValue);
//     },

//     _applyMaterialFilter: function (sValue) {
//       const oTable = this.byId("materialStockTable");
//       const oBinding = oTable.getBinding("items");

//       if (!oBinding) {
//         return;
//       }

      
//       if (!sValue.trim()) {
//         oBinding.filter([]);
//         return;
//       }

      
//       const aFilters = [
//         new Filter("Material", FilterOperator.Contains, sValue.trim())
//       ];

//       oBinding.filter(aFilters);
//     },


//     //=================== STORAGE BIN FILTER ========================================
//        onStorageBinSearch: function (oEvent) {
//       const sValue = oEvent.getParameter("query") || "";
//       this._applyStorageBinFilter(sValue);
//     },


//       _applyStorageBinFilter: function (sValue) {
//       const oTable = this.byId("materialStockTable");
//       const oBinding = oTable.getBinding("items");

//       if (!oBinding) {
//         return;
//       }

      
//       if (!sValue.trim()) {
//         oBinding.filter([]);
//         return;
//       }

      
//       const aFilters = [
//         new Filter("Storage_bin", FilterOperator.Contains, sValue.trim())
//       ];

//       oBinding.filter(aFilters);
//     },


//     //=================== BATCH FILTER ========================================
//     onBatchSearch: function (oEvent) {
//       const sValue = oEvent.getParameter("query") || "";
//       this._applyBatchFilter(sValue);
//     },

//      _applyBatchFilter: function (sValue) {
//       const oTable = this.byId("materialStockTable");
//       const oBinding = oTable.getBinding("items");

//       if (!oBinding) {
//         return;
//       }

      
//       if (!sValue.trim()) {
//         oBinding.filter([]);
//         return;
//       }

      
//       const aFilters = [
//         new Filter("Batch", FilterOperator.Contains, sValue.trim())
//       ];

//       oBinding.filter(aFilters);
//     },

//     //=================== STORAGE TYPE FROM FILTER ========================================

    
//     onStorageTypeFromLiveChange: function (oEvent) {
//       const sValue = oEvent.getParameter("newValue") || "";
//       this._applyStorageTypeFromFilter(sValue.trim());
//     },


    
    
// _applyStorageTypeFromFilter: function (sFrom) {
//   const oTable = this.byId("materialStockTable");
//   const oBinding = oTable.getBinding("items");
//   if (!oBinding) return;

//   if (!sFrom) {
//     oBinding.filter([]); 
//     return;
//   }

  
//   const sFromPadded = sFrom.padStart(3, "0");

//   const oStorageFilter = new sap.ui.model.Filter(
//     "Storage_type",
//     sap.ui.model.FilterOperator.GE,
//     sFromPadded
//   );

//   oBinding.filter([oStorageFilter]); 
// },


// //=================== STORAGE TYPE TO FILTER ========================================


// onStorageTypeToLiveChange: function (oEvent) {
//   const sValue = (oEvent.getParameter("newValue") || "").trim();
//   this._applyStorageTypeToFilter(sValue);
// },



// _applyStorageTypeToFilter: function (sTo) {
//   const oTable = this.byId("materialStockTable");
//   const oBinding = oTable && oTable.getBinding("items");
//   if (!oBinding) return;

 
//   if (!sTo) {
//     oBinding.filter([]);
//     return;
//   }

  
//   const sToPadded = sTo.padStart(3, "0");

//   const oToFilter = new Filter("Storage_type", FilterOperator.LE, sToPadded);

  
//   oBinding.filter([oToFilter]);
// },


//  //=================== BARCODE99 ========================================


// _parseBarcode: function (sBarcode) {
//   const s = (sBarcode || "").replace(/\s+/g, ""); 

  
//   if (!/^\d+$/.test(s)) {
//     throw new Error("Invalid Barcode");
//   }

  
//   if (s.length < 46) {
//     throw new Error("Ivalid Barcode");
//   }

  
//   const werks = s.substr(8, 4);      // 9–12
//   const mat10 = s.substr(26, 10);    // 27–36
//   const charg = s.substr(36, 10);    // 37–46

//   const matnr = mat10.padStart(18, "0");

//   return { werks, matnr, charg };
// },




// onBarcodeSearch: function (oEvent) {
//   const sBarcode = (oEvent.getParameter("query") || "").trim();

//   const oTable = this.byId("materialStockTable");
//   const oBinding = oTable && oTable.getBinding("items");
//   if (!oBinding) return;

  
//   if (!sBarcode) {
//     oBinding.filter([]);
//     return;
//   }

//   try {
//     const { werks, matnr, charg } = this._parseBarcode(sBarcode);

  

    
//     const aFilters = [
//       new Filter("Plant", FilterOperator.EQ, werks),
//       new Filter("Material", FilterOperator.EQ, matnr),
//       new Filter("Batch", FilterOperator.EQ, charg)
//     ];

//     oBinding.filter(aFilters);

    

//   } catch (e) {
//     MessageToast.show(e.message || "Error");
//   }
// },




//     //=================== REFRESH ========================================
        
// onRefresh: function () {
  
//   const aFieldIds = [
//     "materialFilter",
//     "storageBinFilter",
//     "batchFilter",
//     "storageTypeFrom",
//     "storageTypeTo",
//     "barcodeFilter" 
//   ];

//   aFieldIds.forEach(function (sId) {
//     const oCtrl = this.byId(sId);
//     if (!oCtrl) { return; }

   
//     if (typeof oCtrl.setValue === "function") {
//       oCtrl.setValue("");
//     }

   
//     if (typeof oCtrl.setValueState === "function") {
//       oCtrl.setValueState("None");
//       oCtrl.setValueStateText("");
//     }
//   }.bind(this));

  
//   const oTable = this.byId("materialStockTable");
//   const oBinding = oTable && oTable.getBinding("items");
//   if (oBinding) {
//     oBinding.filter([]);     
//     oBinding.refresh(true);  
//   }
// }


//     });
// });


sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/m/MessageToast"
], function (Controller, Filter, FilterOperator, MessageToast) {
  "use strict";

  return Controller.extend("zitsstockoverview.controller.MainView", {

    onInit: function () {
      this._filterTimer = null;
    },

    
    // =============== LIVE CHANGE (DEBOUNCE) ====================
    
    _filterTimer: null,

    _debouncedApplyFilters: function () {
      clearTimeout(this._filterTimer);
      this._filterTimer = setTimeout(function () {
        this.onApplyFilters();
      }.bind(this), 300);
    },

    
    onMaterialLiveChange: function () {
      this._debouncedApplyFilters();
    },

    onStorageBinLiveChange: function () {
      this._debouncedApplyFilters();
    },

    onBatchLiveChange: function () {
      this._debouncedApplyFilters();
    },

    
    onStorageTypeFromLiveChange: function () {
      this._debouncedApplyFilters();
    },

    onStorageTypeToLiveChange: function () {
      this._debouncedApplyFilters();
    },

   
    // =================== SEARCH EVENTS =========================
    
    onMaterialSearch: function () {
      this.onApplyFilters();
    },

    onStorageBinSearch: function () {
      this.onApplyFilters();
    },

    onBatchSearch: function () {
      this.onApplyFilters();
    },

    onBarcodeSearch: function () {
      this.onApplyFilters();
    },

    // =================== NORMALIZE HELPERS =====================
    
    _normalizeStorageType: function (v) {
      
      var s = (v || "").toString().trim();
      if (!s) return "";

      
      s = s.replace(/\D/g, "");
      if (!s) return "";

    
      return s.padStart(3, "0");
    },

    
    // =================== APPLY FILTERS  ==================
   
    onApplyFilters: function () {
      var oTable = this.byId("materialStockTable");
      var oBinding = oTable && oTable.getBinding("items");
      if (!oBinding) return;

   
      var sMaterial   = (this.byId("materialFilter").getValue() || "").trim();
      var sStorageBin = (this.byId("storageBinFilter").getValue() || "").trim();
      var sBatch      = (this.byId("batchFilter").getValue() || "").trim();
      var sFromRaw    = (this.byId("storageTypeFrom").getValue() || "").trim();
      var sToRaw      = (this.byId("storageTypeTo").getValue() || "").trim();
      var sBarcode    = (this.byId("barcodeFilter").getValue() || "").trim();

      // =================== BARCODE PRIORITY ===================
      
      if (sBarcode) {
        try {
          var oParsed = this._parseBarcode(sBarcode);

          var aBarcodeFilters = [
            new Filter("Plant",    FilterOperator.EQ, oParsed.werks),
            new Filter("Material", FilterOperator.EQ, oParsed.matnr),
            new Filter("Batch",    FilterOperator.EQ, oParsed.charg)
          ];

          oBinding.filter(aBarcodeFilters); 
        } catch (e) {
          MessageToast.show(e.message || "Error");
        }
        return;
      }

      // =================== NORMAL FILTERS  ===================
      var aFilters = [];

      if (sMaterial) {
        aFilters.push(new Filter("Material", FilterOperator.Contains, sMaterial));
      }

      if (sStorageBin) {
        aFilters.push(new Filter("Storage_bin", FilterOperator.Contains, sStorageBin));
      }

      if (sBatch) {
        aFilters.push(new Filter("Batch", FilterOperator.Contains, sBatch));
      }

      // =================== STORAGE TYPE RANGE  ===================
   
      var sFrom = this._normalizeStorageType(sFromRaw);
      var sTo   = this._normalizeStorageType(sToRaw);

      if (sFrom && sTo) {
        
        if (sFrom > sTo) {
          var tmp = sFrom; sFrom = sTo; sTo = tmp;
        }
        aFilters.push(new Filter("Storage_type", FilterOperator.BT, sFrom, sTo));
      } else if (sFrom) {
        aFilters.push(new Filter("Storage_type", FilterOperator.GE, sFrom));
      } else if (sTo) {
        aFilters.push(new Filter("Storage_type", FilterOperator.LE, sTo));
      }


      oBinding.filter(aFilters);
    },

   
    // =================== BARCODE PARSE ===================
    
    _parseBarcode: function (sBarcode) {
      var s = (sBarcode || "").replace(/\s+/g, "");

      if (!/^\d+$/.test(s)) {
        throw new Error("Invalid Barcode");
      }

      if (s.length < 46) {
        throw new Error("Ivalid Barcode");
      }

      var werks = s.substr(8, 4);      // 9–12
      var mat10 = s.substr(26, 10);    // 27–36
      var charg = s.substr(36, 10);    // 37–46

      var matnr = mat10.padStart(18, "0");

      return { werks: werks, matnr: matnr, charg: charg };
    },

    // =================== REFRESH / CLEAR =======================
    
    onRefresh: function () {
      var aFieldIds = [
        "materialFilter",
        "storageBinFilter",
        "batchFilter",
        "storageTypeFrom",
        "storageTypeTo",
        "barcodeFilter"
      ];

      aFieldIds.forEach(function (sId) {
        var oCtrl = this.byId(sId);
        if (!oCtrl) return;

        if (typeof oCtrl.setValue === "function") {
          oCtrl.setValue("");
        }

        if (typeof oCtrl.setValueState === "function") {
          oCtrl.setValueState("None");
          oCtrl.setValueStateText("");
        }
      }.bind(this));

      var oTable = this.byId("materialStockTable");
      var oBinding = oTable && oTable.getBinding("items");
      if (oBinding) {
        oBinding.filter([]);
        oBinding.refresh(true);
      }
    }

  });
});