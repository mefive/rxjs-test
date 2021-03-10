import { PageActionQueueType } from './types';

export default {
  '3feb7a16-73d6-4378-b1aa-1af0e25240ee': {
    id: '3feb7a16-73d6-4378-b1aa-1af0e25240ee',
    name: '打开费用',
    actions: [
      {
        type: 'CONTROL_MODAL',
        parallel: true,
        modalId: '75697bbd-365c-4c3e-87da-2700ea201271',
        open: true,
        params: null,
      },
      {
        type: 'OTHER_ACTION_QUEUE',
        actionId: '75f1f81c-ff8f-4ad6-a62b-02c774e1ee21',
      },
      {
        type: 'SEND_REQUEST',
        dataCode: 'expense',
        params: null,
        url: '/project/smartfin/api/reimb/expense/getById/${states.expenseId}',
        method: 'GET',
        format: 'form',
      },
      {
        type: 'SET_DATA',
        params: {
          expense: '${_params}',
        },
      },
      {
        type: 'FETCH_DATA',
        dataCode: 'ouidList',
        params: null,
      },
      {
        type: 'FETCH_DATA',
        dataCode: 'expenseFinance',
        params: null,
      },
    ],
    type: PageActionQueueType.GLOBAL,
    ts: 1607426744997,
  },
  'fd1f8c1c-312f-42f6-bb52-eb47dc72174e': {
    id: 'fd1f8c1c-312f-42f6-bb52-eb47dc72174e',
    name: '点击',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'SEND_REQUEST',
        url: '/project/smartfin/api/reimb/invoice/getById/${_context.id}',
        method: 'GET',
        params: null,
        format: 'form',
      },
      {
        type: 'EXEC_CODE',
        code:
          'function execAction(state, _params, _context, _index) {\n    return _.assign(_params, {\n        fileType: _context.fileType,\n        index: _index,\n        size: _.size(state.expense.invoices)\n    });\n}',
        params: null,
      },
      {
        type: 'SET_DATA',
        params: {
          'expense.invoice': '${_params}',
        },
      },
    ],
    ts: 1607480381471,
  },
  '5a6abf07-7ac4-4668-ba05-57d61bc33454': {
    id: '5a6abf07-7ac4-4668-ba05-57d61bc33454',
    name: '点击行',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'SET_DATA',
        params: {
          'states.expenseIndex': '${_index}',
          'states.expenseId': '${reimbApplyInfo.expenseModels[_index].id}',
          'expense.invoice': null,
        },
      },
      {
        type: 'OTHER_ACTION_QUEUE',
        params: null,
        actionId: '3feb7a16-73d6-4378-b1aa-1af0e25240ee',
      },
    ],
    ts: 1607494984470,
  },
  '739f46a7-e2da-4794-ad19-c66aaf6c5331': {
    id: '739f46a7-e2da-4794-ad19-c66aaf6c5331',
    name: '点击行',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'OTHER_ACTION_QUEUE',
        params: null,
        actionId: '3feb7a16-73d6-4378-b1aa-1af0e25240ee',
      },
    ],
    ts: 1607494992702,
  },
  '75f1f81c-ff8f-4ad6-a62b-02c774e1ee21': {
    id: '75f1f81c-ff8f-4ad6-a62b-02c774e1ee21',
    name: '点击',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'SET_DATA',
        params: {
          'states.expenseIndex': '${states.expenseIndex-1}',
        },
      },
      {
        type: 'SET_DATA',
        params: {
          '_system.params.expenseId':
            '${reimbApplyInfo.expenseModels[states.expenseIndex].id}',
        },
        pageId: 'dc09147bb321454081620fa1ea89edcd',
      },
      {
        type: 'OTHER_ACTION_QUEUE',
        params: null,
        actionId: '3feb7a16-73d6-4378-b1aa-1af0e25240ee',
      },
    ],
    ts: 1607583849864,
  },
  '17917028-0420-4009-8f75-c4cb45967bc5': {
    id: '17917028-0420-4009-8f75-c4cb45967bc5',
    name: '点击',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'SET_DATA',
        params: {
          'states.expenseIndex': '${states.expenseIndex+1}',
        },
      },
      {
        type: 'SET_DATA',
        params: {
          '_system.params.expenseId':
            '${reimbApplyInfo.expenseModels[states.expenseIndex].id}',
        },
        pageId: 'dc09147bb321454081620fa1ea89edcd',
      },
      {
        type: 'OTHER_ACTION_QUEUE',
        params: null,
        actionId: '3feb7a16-73d6-4378-b1aa-1af0e25240ee',
      },
    ],
    ts: 1607584276756,
  },
  '2d18dfc7-c79e-4bac-9d68-0df08bedceea': {
    id: '2d18dfc7-c79e-4bac-9d68-0df08bedceea',
    name: '点击',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'EXEC_CODE',
        params: null,
        code:
          "function execAction(state, _params, _context, _index) {\n    var codes = _.split(_context.accountCode, '.');\n    return _.map(state.financeAccountCodes.data, function (code, index) {\n        return {\n            name: code.name,\n            code: codes[index]\n        }\n    })\n}",
      },
      {
        type: 'SET_DATA',
        params: {
          financeAccountCodes: {
            data: '${_params}',
            codeErros: [],
            errors: [],
            index: '${_index}',
          },
        },
      },
      {
        type: 'CONTROL_MODAL',
        open: true,
        modalId: '1a30d764-fb37-4d34-a473-9fb1ba78036f',
        params: null,
      },
      {
        type: 'SEND_REQUEST',
        url: '/project/smartfin/api/base/coaSegment/checkCoa',
        method: 'GET',
        format: 'json',
        params: {
          columnName: 'SEGMENT1',
          coaCode: '${financeAccountCodes.data[0].code}',
        },
      },
      {
        type: 'SET_DATA',
        params: {
          'financeAccountCodes.messages.segment0': '${_params.msg}',
          'financeAccountCodes.checkStatus.segment0': '${_params.status}',
        },
      },
      {
        type: 'SEND_REQUEST',
        url: '/project/smartfin/api/base/coaSegment/checkCoa',
        method: 'GET',
        format: 'json',
        params: {
          columnName: 'SEGMENT2',
          coaCode: '${financeAccountCodes.data[1].code}',
        },
      },
      {
        type: 'SET_DATA',
        params: {
          'financeAccountCodes.messages.segment1': '${_params.msg}',
          'financeAccountCodes.checkStatus.segment1': '${_params.status}',
        },
      },
      {
        type: 'SEND_REQUEST',
        url: '/project/smartfin/api/base/coaSegment/checkCoa',
        method: 'GET',
        format: 'json',
        params: {
          columnName: 'SEGMENT3',
          coaCode: '${financeAccountCodes.data[2].code}',
        },
      },
      {
        type: 'SET_DATA',
        params: {
          'financeAccountCodes.messages.segment2': '${_params.msg}',
          'financeAccountCodes.checkStatus.segment2': '${_params.status}',
        },
      },
      {
        type: 'SEND_REQUEST',
        url: '/project/smartfin/api/base/coaSegment/checkCoa',
        method: 'GET',
        format: 'json',
        params: {
          columnName: 'SEGMENT4',
          coaCode: '${financeAccountCodes.data[3].code}',
        },
      },
      {
        type: 'SET_DATA',
        params: {
          'financeAccountCodes.messages.segment3': '${_params.msg}',
          'financeAccountCodes.checkStatus.segment3': '${_params.status}',
        },
      },
      {
        type: 'SEND_REQUEST',
        url: '/project/smartfin/api/base/coaSegment/checkCoa',
        method: 'GET',
        format: 'json',
        params: {
          columnName: 'SEGMENT5',
          coaCode: '${financeAccountCodes.data[4].code}',
        },
      },
      {
        type: 'SET_DATA',
        params: {
          'financeAccountCodes.messages.segment4': '${_params.msg}',
          'financeAccountCodes.checkStatus.segment4': '${_params.status}',
        },
      },
      {
        type: 'SEND_REQUEST',
        url: '/project/smartfin/api/base/coaSegment/checkCoa',
        method: 'GET',
        format: 'json',
        params: {
          columnName: 'SEGMENT6',
          coaCode: '${financeAccountCodes.data[5].code}',
        },
      },
      {
        type: 'SET_DATA',
        params: {
          'financeAccountCodes.messages.segment5': '${_params.msg}',
          'financeAccountCodes.checkStatus.segment5': '${_params.status}',
        },
      },
      {
        type: 'SEND_REQUEST',
        url: '/project/smartfin/api/base/coaSegment/checkCoa',
        method: 'GET',
        format: 'json',
        params: {
          columnName: 'SEGMENT7',
          coaCode: '${financeAccountCodes.data[6].code}',
        },
      },
      {
        type: 'SET_DATA',
        params: {
          'financeAccountCodes.messages.segment6': '${_params.msg}',
          'financeAccountCodes.checkStatus.segment6': '${_params.status}',
        },
      },
      {
        type: 'SEND_REQUEST',
        url: '/project/smartfin/api/base/coaSegment/checkCoa',
        method: 'GET',
        format: 'form',
        params: {
          columnName: 'SEGMENT8',
          coaCode: '${financeAccountCodes.data[7].code}',
        },
      },
      {
        type: 'SET_DATA',
        params: {
          'financeAccountCodes.messages.segment7': '${_params.msg}',
          'financeAccountCodes.checkStatus.segment7': '${_params.status}',
        },
      },
      {
        type: 'SEND_REQUEST',
        url: '/project/smartfin/api/base/coaSegment/checkCoa',
        method: 'GET',
        format: 'form',
        params: {
          columnName: 'SEGMENT9',
          coaCode: '${financeAccountCodes.data[8].code}',
        },
      },
      {
        type: 'SET_DATA',
        params: {
          'financeAccountCodes.messages.segment8': '${_params.msg}',
          'financeAccountCodes.checkStatus.segment8': '${_params.status}',
        },
      },
    ],
    ts: 1607927186227,
  },
  '91ee3748-2cc1-42fa-992d-0255f10bdcb3': {
    id: '91ee3748-2cc1-42fa-992d-0255f10bdcb3',
    name: '点击',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'CONTROL_MODAL',
        modalId: '75697bbd-365c-4c3e-87da-2700ea201271',
        params: null,
      },
    ],
    ts: 1607931921959,
  },
  'd69d4167-25c5-4bf3-9867-e57320ec9eed': {
    id: 'd69d4167-25c5-4bf3-9867-e57320ec9eed',
    name: '值变更',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'EXEC_CODE',
        code:
          "function execAction(state, _params, _context, _index) {\n    var ouId = state.expenseFinance.accountOuId;\n    ouId = _.find(state.ouidList, function (o) {\n        return o.id === +ouId;\n    });\n    var financeAccountItemModels = state.expenseFinance.financeAccountItemModels;\n    var updated = _.map(financeAccountItemModels, function (item) {\n        return _.assign({}, item, {\n            accountCode: _.map(_.split(item.accountCode, '.'), function (code, index) {\n                if (index === 0) {\n                    return ouId.companyCode;\n                }\n\n                if (index === 1) {\n                    return ouId.buCode;\n                }\n\n                return code;\n            }).join('.')\n        })\n    })\n    return updated;\n}",
        params: null,
      },
      {
        type: 'SET_DATA',
        params: {
          'expenseFinance.financeAccountItemModels': '${_params}',
        },
      },
    ],
    ts: 1607933541261,
  },
  '39093b79-9499-4ab0-8ff5-f5bc09ab089f': {
    id: '39093b79-9499-4ab0-8ff5-f5bc09ab089f',
    name: '点击',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'CONTROL_MODAL',
        open: false,
        modalId: '1a30d764-fb37-4d34-a473-9fb1ba78036f',
        params: null,
      },
    ],
    ts: 1607935360555,
  },
  'cb658c13-f84b-48a2-90f9-4784de0e1401': {
    id: 'cb658c13-f84b-48a2-90f9-4784de0e1401',
    name: '点击',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'SEND_REQUEST',
        url: '/project/smartfin/api/reimb/financeAccount/checkOuNine',
        method: 'POST',
        params: {
          ebsOuId: '${expenseFinance.accountOuId}',
          accountCode: "${financeAccountCodes.data|map('code')|join('.')}",
        },
        format: 'json',
      },
      {
        type: 'SET_DATA',
        params: {
          'financeAccountCodes.errors': "${_params|map('msg')}",
        },
      },
      {
        type: 'GUARD',
        params: null,
        code:
          'function execAction(state, _params, _context, _index) {\n    return _.size(state.financeAccountCodes.errors) === 0;\n}',
      },
      {
        type: 'SET_DATA',
        params: {
          'expenseFinance.financeAccountItemModels[${financeAccountCodes.index}].accountCode':
            "${financeAccountCodes.data|map('code')|join('.')}",
        },
      },
      {
        type: 'CONTROL_MODAL',
        modalId: '1a30d764-fb37-4d34-a473-9fb1ba78036f',
        params: null,
      },
    ],
    ts: 1607935586642,
  },
  '12ddcd09-5105-40b0-936c-5831afe5bdfb': {
    id: '12ddcd09-5105-40b0-936c-5831afe5bdfb',
    name: '失去焦点',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'SEND_REQUEST',
        url: '/project/smartfin/api/base/coaSegment/checkCoa',
        method: 'GET',
        params: {
          columnName: 'SEGMENT${_index+1}',
          coaCode: '${financeAccountCodes.data[_index].code}',
        },
        format: 'json',
      },
      {
        type: 'SET_DATA',
        params: {
          'financeAccountCodes.messages.segment${_index}': '${_params.msg}',
        },
      },
    ],
    ts: 1607944612003,
  },
  '30992ad0-8f22-4e24-b653-cc0f718bb73f': {
    id: '30992ad0-8f22-4e24-b653-cc0f718bb73f',
    name: '--',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'FETCH_DATA',
        dataCode: 'reimbApplyInfo',
        params: null,
      },
      {
        type: 'FETCH_DATA',
        dataCode: 'intelligentChecking',
        params: null,
      },
      {
        type: 'GUARD',
        params: "${reimbApplyInfo.businessTypeCode=='BTtravelOnBusiness'}",
      },
      {
        type: 'SEND_REQUEST',
        url: '/project/smartfin/api/reimb/travel/getTravelDetail',
        method: 'GET',
        format: 'json',
        params: {
          id: '${reimbApplyInfo.travels[0].travelId}',
          serialNumber: '${reimbApplyInfo.travels[0].travelSerialNumber}',
          realUserNo: '${reimbApplyInfo.realEmplNo}',
        },
      },
      {
        type: 'SET_DATA',
        params: {
          'reimbApplyInfo.travelDetail': '${_params}',
        },
      },
      {
        type: 'SEND_REQUEST',
        url: '/project/smartfin/api/reimb/travel/getTravelOrder',
        params: {
          serialNumber: '${reimbApplyInfo.travels[0].travelSerialNumber}',
        },
        method: 'GET',
        format: 'json',
      },
      {
        type: 'SET_DATA',
        params: {
          'reimbApplyInfo.travelOrder': '${_params}',
        },
      },
    ],
    ts: 1608026794071,
  },
  '9848e5d2-a259-4ab4-9253-7fb731794316': {
    id: '9848e5d2-a259-4ab4-9253-7fb731794316',
    name: '--',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'CONTROL_MODAL',
        open: true,
        modalId: 'a14fa69a-5d88-4e00-97bb-8d3e970484ac',
        params: null,
      },
    ],
    confirm: '',
    ts: 1608031993128,
  },
  '383ce509-0299-452d-b3e3-d0fd7ba3b098': {
    id: '383ce509-0299-452d-b3e3-d0fd7ba3b098',
    name: '--',
    type: PageActionQueueType.LOCAL,
    actions: [],
    ts: 1608037316228,
  },
  '94f91d73-c29b-4dfb-90ff-d7221374b13d': {
    id: '94f91d73-c29b-4dfb-90ff-d7221374b13d',
    name: '--',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'CONTROL_MODAL',
        params: null,
        modalId: 'a14fa69a-5d88-4e00-97bb-8d3e970484ac',
      },
    ],
    ts: 1608090373531,
  },
  'efaa9058-4bb1-45c2-b247-383f744c45c9': {
    id: 'efaa9058-4bb1-45c2-b247-383f744c45c9',
    name: '--',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'EXEC_CODE',
        params: "${reimbApplyInfo.bagCode!=null&&reimbApplyInfo.bagCode!=''}",
      },
      {
        type: 'CONTROL_MODAL',
        open: true,
        modalId: 'a14fa69a-5d88-4e00-97bb-8d3e970484ac',
        params: null,
      },
    ],
    ts: 1608102572188,
  },
  '2857fc98-a6bf-41ac-8a61-08df0e721660': {
    id: '2857fc98-a6bf-41ac-8a61-08df0e721660',
    name: '确定',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'SEND_REQUEST',
        url: '/project/smartfin/api/reimb/reimbApply/financeAudit',
        method: 'POST',
        format: 'json',
        params: {
          businessCode: '${metadata.businessCode}',
          financeOperateType: '${states.rejectType}',
        },
      },
      {
        type: 'OTHER_ACTION_QUEUE',
        params: null,
        actionId: '25bb58ec-1668-4175-91d4-6b0a410c3f98',
      },
    ],
    ts: 1608117902561,
  },
  'cbd58ed2-a177-4df2-9f4b-86d0bd354ce1': {
    id: 'cbd58ed2-a177-4df2-9f4b-86d0bd354ce1',
    name: '保存费用',
    type: PageActionQueueType.GLOBAL,
    actions: [
      {
        type: 'SEND_REQUEST',
        url: '/project/smartfin/api/reimb/financeAccount/saveExpenseAccounting',
        method: 'POST',
        format: 'json',
        params: {
          reimbFinanceAccountItemModels:
            '${expenseFinance.financeAccountItemModels}',
        },
      },
      {
        type: 'SET_DATA',
        params: {
          'expenseFinance.errors': "${_params|map('msg')}",
        },
      },
      {
        type: 'GUARD',
        params: '${expenseFinance.errors|size==0}',
      },
      {
        type: 'CONTROL_MODAL',
        modalId: '75697bbd-365c-4c3e-87da-2700ea201271',
        params: null,
      },
    ],
    ts: 1608119280956,
  },
  'c93a544d-6aaf-43dc-ba33-cafd6fde2684': {
    id: 'c93a544d-6aaf-43dc-ba33-cafd6fde2684',
    name: '点击',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'OTHER_ACTION_QUEUE',
        params: null,
        actionId: 'cbd58ed2-a177-4df2-9f4b-86d0bd354ce1',
      },
    ],
    ts: 1608119435211,
  },
  '25bb58ec-1668-4175-91d4-6b0a410c3f98': {
    id: '25bb58ec-1668-4175-91d4-6b0a410c3f98',
    name: '关闭workflow',
    actions: [
      {
        type: 'EXEC_CODE',
        code:
          "function execAction(state, _params, _context, _index) {\n    window.ebpm.wfuiFrame.fireEvent('submit')\n    window.ebpm.wfuiFrame.close();\n}\n",
        params: null,
      },
    ],
    type: PageActionQueueType.GLOBAL,
    ts: 1608173347398,
  },
  '937ca16e-cdcb-4c59-a04e-118c13deda37': {
    id: '937ca16e-cdcb-4c59-a04e-118c13deda37',
    name: '--',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'SEND_REQUEST',
        url: '/project/smartfin/api/reimb/reimbApply/businessLeaderAudit',
        method: 'POST',
        format: 'json',
        params: {
          businessCode: '${metadata.businessCode}',
        },
      },
    ],
    ts: 1608173458492,
  },
  '0013ff59-becd-43d8-9578-dc32529d50bd': {
    id: '0013ff59-becd-43d8-9578-dc32529d50bd',
    name: '--',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'SEND_REQUEST',
        url: '/project/smartfin/api/reimb/reimbApply/otherLeaderAudit',
        method: 'POST',
        format: 'json',
        params: {
          businessCode: '${metadata.businessCode}',
        },
      },
    ],
    ts: 1608173527049,
  },
  'e58698e5-1e5c-4ada-ae13-88b8ff3fe80e': {
    id: 'e58698e5-1e5c-4ada-ae13-88b8ff3fe80e',
    name: '--',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'SEND_REQUEST',
        url: '/project/smartfin/api/reimb/reimbApply/otherLeaderAudit',
        method: 'POST',
        format: 'json',
        params: {
          businessCode: '${metadata.businessCode}',
        },
      },
    ],
    ts: 1608175913248,
  },
  '649e6779-81aa-45e4-a55c-006fe1fec3a8': {
    id: '649e6779-81aa-45e4-a55c-006fe1fec3a8',
    name: '点击',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'SEND_REQUEST',
        url: '/project/smartfin/api/reimb/invoice/getById/${_context.id}',
        method: 'GET',
        params: null,
        format: 'form',
      },
      {
        type: 'EXEC_CODE',
        code:
          'function execAction(state, _params, _context, _index) {\n    return _.assign(_params, {\n        fileType: _context.fileType,\n        index: _index,\n        size: _.size(state.expense.invoices)\n    });\n}',
        params: null,
      },
      {
        type: 'SET_DATA',
        params: {
          'expense.invoice': '${_params}',
        },
      },
    ],
    ts: 1607480381471,
    code: null,
  },
  'cb97d702-e06f-4cf5-943e-807a0e1fb5af': {
    id: 'cb97d702-e06f-4cf5-943e-807a0e1fb5af',
    name: '值变更',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'EXEC_CODE',
        code:
          "function execAction(state, _params, _context, _index) {\n  var ouId = state.expenseFinance.accountOuId;\n  ouId = _.find(state.ouidList, function (o) {\n      return o.id == ouId;\n  });\n  var financeAccountItemModels = state.expenseFinance.financeAccountItemModels;\n  var updated = _.map(financeAccountItemModels, function (item) {\n      return _.assign({}, item, {\n          accountCode: _.map(_.split(item.accountCode, '.'), function (code, index) {\n              if (index === 0) {\n                  return ouId.companyCode;\n              }\n\n              if (index === 1) {\n                  return ouId.buCode;\n              }\n\n              return code;\n          }).join('.'),\n          ebsOuId: ouId.id\n      })\n  })\n  return updated;\n}",
        params: null,
      },
      {
        type: 'SET_DATA',
        params: {
          'expenseFinance.financeAccountItemModels': '${_params}',
        },
      },
    ],
    ts: 1607933541261,
    code: null,
  },
  '34c0fc54-46c4-4b2c-a5ae-97218e7dd786': {
    id: '34c0fc54-46c4-4b2c-a5ae-97218e7dd786',
    name: '--',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'EXEC_CODE',
        params: "${reimbApplyInfo.bagCode==null||reimbApplyInfo.bagCode==''}",
      },
      {
        type: 'SEND_REQUEST',
        url: '/project/smartfin/api/reimb/reimbApply/financeAudi',
        method: 'POST',
        format: 'json',
        params: {
          businessCode: '${metadata.businessCode}',
          financeOperateType: 'REJECT',
        },
      },
      {
        type: 'OTHER_ACTION_QUEUE',
        params: null,
        actionId: '25bb58ec-1668-4175-91d4-6b0a410c3f98',
      },
    ],
    ts: 1608259466477,
  },
  '43cf5736-41d0-4f44-a4a9-a337e43a8e94': {
    id: '43cf5736-41d0-4f44-a4a9-a337e43a8e94',
    name: '失去焦点',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'SEND_REQUEST',
        url: '/project/smartfin/api/base/coaSegment/checkCoa',
        method: 'GET',
        format: 'json',
        params: {
          columnName: 'SEGMENT${_index+1}',
          coaCode: '${financeAccountCodes.data[_index].code}',
        },
      },
      {
        type: 'SET_DATA',
        dataCode: 'expenseFinance',
        params: {
          'financeAccountCodes.messages.segment${_index}': '${_params.msg}',
          'financeAccountCodes.checkStatus.segment${_index}':
            '${_params.status}',
        },
      },
    ],
    ts: 1608261986886,
  },
  'bca7b2c9-770f-462f-b359-8d9bc262659a': {
    id: 'bca7b2c9-770f-462f-b359-8d9bc262659a',
    name: '--',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'SEND_REQUEST',
        url: '/project/smartfin/api/reimb/reimbApply/otherLeaderAudit',
        method: 'POST',
        format: 'json',
        params: {
          businessCode: '${metadata.businessCode}',
        },
      },
      {
        type: 'OTHER_ACTION_QUEUE',
        params: null,
        actionId: '25bb58ec-1668-4175-91d4-6b0a410c3f98',
      },
    ],
    ts: 1608540714696,
  },
  '35797591-23f3-4a31-bbf8-615c7e5ece5e': {
    id: '35797591-23f3-4a31-bbf8-615c7e5ece5e',
    name: '--',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'SEND_REQUEST',
        params: {
          businessCode: '${metadata.businessCode}',
        },
        url: '/project/smartfin/api/reimb/reimbApply/financeAuditSubmit',
        method: 'POST',
        format: 'json',
      },
      {
        type: 'EXEC_CODE',
        code:
          "function execAction(state, _params, _context, _index) {\n    return _.join(_.map(_params, function (data) {\n        return data.accountCode + data.msg;\n    }), ',');\n}",
        params: null,
      },
      {
        type: 'SET_DATA',
        params: {
          submitResult: '${_params}',
        },
      },
      {
        type: 'GUARD',
        params: '${!submitResult}',
      },
      {
        type: 'OTHER_ACTION_QUEUE',
        params: null,
        actionId: '25bb58ec-1668-4175-91d4-6b0a410c3f98',
      },
    ],
    ts: 1608794563807,
  },
  '3a1aa4f6-5a94-4440-b012-d859088737a1': {
    id: '3a1aa4f6-5a94-4440-b012-d859088737a1',
    name: '--',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'NOTIFICATION',
        message: "${submitResult.data|map('msg')|join(',')}",
        params: null,
      },
    ],
    ts: 1608803941029,
  },
  'b1919ce7-6616-4efd-953c-9cf5004df865': {
    id: 'b1919ce7-6616-4efd-953c-9cf5004df865',
    name: '--',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'GUARD',
        params: '${submitResult|size>0}',
      },
      {
        type: 'NOTIFICATION',
        message: '${submitResult}',
        params: null,
      },
      {
        type: 'SET_DATA',
        params: {
          submitResult: null,
        },
      },
    ],
    ts: 1608804069465,
  },
  'babbcce6-7ec1-48df-8829-3ad8cfa81dc6': {
    id: 'babbcce6-7ec1-48df-8829-3ad8cfa81dc6',
    name: '点击',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'CONTROL_MODAL',
        open: true,
        modalId: '533c36ce-0af9-439d-ba68-dd934269c3c6',
        params: null,
      },
    ],
    ts: 1608888097961,
  },
  '42871eba-8146-404f-a4c0-8cee10248e27': {
    id: '42871eba-8146-404f-a4c0-8cee10248e27',
    name: '点击',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'SEND_REQUEST',
        url: '/project/smartfin/api/reimb/invoice/getById/${_context.id}',
        method: 'GET',
        params: null,
        format: 'form',
      },
      {
        type: 'EXEC_CODE',
        code:
          'function execAction(state, _params, _context, _index) {\n    return _.assign(_params, {\n        fileType: _context.fileType,\n        index: _index,\n        size: _.size(state.expense.invoices)\n    });\n}',
        params: null,
      },
      {
        type: 'SET_DATA',
        params: {
          'expense.invoice': '${_params}',
        },
      },
    ],
    ts: 1607480381471,
    code: null,
  },
  'f5f89b66-12bd-4a38-934e-a8ea3c32246f': {
    id: 'f5f89b66-12bd-4a38-934e-a8ea3c32246f',
    name: '点击',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'SET_DATA',
        parallel: false,
        params: {
          'states.imagePreviewUrl': '${_context.invoiceUrl}',
        },
      },
      {
        type: 'CONTROL_MODAL',
        code: 'function execAction(state, _params, _context, _index) {\n}',
        open: true,
        modalId: '1a99e9e7-9234-4b95-8928-864e0afa26a2',
        params: null,
      },
    ],
    ts: 1609127285536,
  },
  '9a80fbc5-ee85-43f0-92cd-d643162aac06': {
    id: '9a80fbc5-ee85-43f0-92cd-d643162aac06',
    name: '点击',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'SEND_REQUEST',
        url:
          '/project/smartfin/api/reimb/invoice/getOriginalIdentidy/${_context.id}',
        method: 'GET',
        format: 'json',
        params: null,
      },
      {
        type: 'EXEC_CODE',
        code:
          'function execAction(state, _params, _context, _index) {\n    var invoiceAttr = _.first(_params).invoiceAttr;\n    if (!invoiceAttr) {\n        return [];\n    }\n    return _.map(_.entries(invoiceAttr), function (arr) {\n        return {\n            label: arr[0],\n            text: arr[1]\n        };\n    });\n}',
        params: null,
      },
      {
        type: 'SET_DATA',
        params: {
          'expense.invoiceIdentidy': '${_params}',
        },
      },
      {
        type: 'CONTROL_MODAL',
        open: true,
        modalId: '812ef8f7-34f6-4df4-ac69-ba2ec9f3902a',
        params: null,
      },
    ],
    ts: 1609329093645,
  },
  '52993b2f-50c3-4c60-a0f0-2979fc551460': {
    id: '52993b2f-50c3-4c60-a0f0-2979fc551460',
    name: '点击',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'CONTROL_MODAL',
        modalId: '812ef8f7-34f6-4df4-ac69-ba2ec9f3902a',
        params: null,
      },
    ],
    ts: 1609403835945,
  },
  '077df840-dcca-4d1c-9f20-03dd92edbc5b': {
    id: '077df840-dcca-4d1c-9f20-03dd92edbc5b',
    name: '点击',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'GO',
        open: true,
        url: '${_context.invoiceUrl}',
        params: null,
      },
    ],
    ts: 1609990820438,
  },
  '800875e1-3f0c-43a3-af08-724fdef06750': {
    id: '800875e1-3f0c-43a3-af08-724fdef06750',
    name: '点击',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'GO',
        url: '${_context.invoiceUrl}',
        open: true,
        params: null,
      },
    ],
    ts: 1609990850734,
  },
  '58572a67-857b-4836-8b6f-9220bb63c662': {
    id: '58572a67-857b-4836-8b6f-9220bb63c662',
    name: '点击',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'SET_DATA',
        params: {
          'states.imagePreviewUrl': '${_context.fileUrl}',
        },
      },
      {
        type: 'CONTROL_MODAL',
        modalId: '1a99e9e7-9234-4b95-8928-864e0afa26a2',
        open: true,
        params: null,
      },
    ],
    ts: 1610354468169,
  },
  '47b7945b-70b1-4c0b-a008-137ce102322b': {
    id: '47b7945b-70b1-4c0b-a008-137ce102322b',
    name: '点击',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'GO',
        url: '${_context.fileUrl}',
        open: true,
        params: null,
      },
    ],
    ts: 1610354635022,
  },
  '9ac98350-8489-4d32-8de7-0d4ba34943bf': {
    id: '9ac98350-8489-4d32-8de7-0d4ba34943bf',
    name: '点击',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'SET_DATA',
        params: {
          foo: 'bar',
        },
        pageId: 'dc09147bb321454081620fa1ea89edcd1',
      },
    ],
    ts: 1612149715896,
  },
  '358d5f4c-c4ed-4b18-a895-beac081e70b9': {
    id: '358d5f4c-c4ed-4b18-a895-beac081e70b9',
    name: '点击',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'EXEC_CODE',
        code:
          'function execAction(state, _params, _context, _index) {\n    window.open(`https://oa.sogou-inc.com/pub/travel/pc/preview/${state.reimbApplyInfo.travels[0].travelId}`)\n}',
        open: true,
        url:
          '`http://test.oa.sogou-inc.com/pub/travel/pc/preview/${reimbApplyInfo.travels[0].travelId}`',
        params: null,
      },
    ],
    ts: 1612342984756,
  },
  '7e6e13d6-d85e-4e68-85e4-54e3a05eab98': {
    id: '7e6e13d6-d85e-4e68-85e4-54e3a05eab98',
    name: '点击',
    type: PageActionQueueType.LOCAL,
    actions: [
      {
        type: 'SET_DATA',
        params: {
          'states.expenseId': '${_context.id}',
        },
      },
      {
        type: 'OTHER_ACTION_QUEUE',
        params: null,
        actionId: '3feb7a16-73d6-4378-b1aa-1af0e25240ee',
      },
    ],
    ts: 1612782355609,
  },
};
