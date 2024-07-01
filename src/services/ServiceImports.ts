import ParkService from './ParkService';
import GuestService from './GuestService';
import SiteTypeService from './prkset/SiteTypeService';
import SiteService from './prkset/SiteService';
import DiscountService from './prkset/DiscountService';
import ChargeService from './prkset/ChargeService';
import CreditService from './prkset/CreditService';
import DateRangeService from './prkset/DateRangeService';
import EmailTemplatesService from './prkset/EmailTemplateService';
import GlAccountService from './prkset/GLAccountService';
import MessageService from './prkset/MessageService';
import EmailMessageService from './prkset/EmailMessageService';
import OrderItemService from './prkset/OrderItemService';
import OrderService from './prkset/OrderService';
import PaymentGatewayService from './prkset/PaymentGatewayService';
import PaymentMethodService from './prkset/PaymentMethodService';
import CardPaymentMethodService from './prkset/CardPaymentMethodService';
import PaymentService from './prkset/PaymentService';
import ReservationService from './ReservationService';
import GroupHoldService from './GroupHoldService';
import ProductService from './prkset/ProductService';
import RateService from './prkset/RateService';
import RefundService from './prkset/RefundService';
import SundryService from './prkset/SundryService';
import TaxRateService from './prkset/TaxRateService';
import TransactionService from './prkset/TransactionService';
import UniversalTypesService from './prkset/UniversalSiteTypesService';
import PaymentRuleService from './rules/PaymentRuleService';
import TaxRuleService from './rules/TaxRuleService';
import UtilityFeeService from './utilities/UtilityFeeService';
import UtilityTaxService from './utilities/UtilityTaxService';
import UtilityTypeService from './utilities/UtilityTypeService';
import UtilityMeterService from './utilities/UtilityMeterService';
import UtilityReadingService from './utilities/UtilityReadingService';
import ActivityLogService from './ActivityLogService';
import LocationService from './LocationService';
import LongTermRequestService from './LongTermRequestService';
import LookupService from './LookupService';
import MaintenanceService from './MaintenanceService';
import PhotoService from './PhotoService';
import ProductCategoryService from './ProductCategoryService';
import ReservationFiltersService from './ReservationFiltersService';
import SiteHoldService from './SiteHoldService';
import UserService from './UserService';
import VehicleService from './VehicleService';

import VehicleLookupService from './prkset/VehicleLookupService';
import ReportService from './ReportService';
import FileService from './FileService';
import ProcessingFeeService from './rules/ProcessingFeeService';

export { VehicleLookupService, ReportService };

export const collection = {
  Park: ParkService,
  Guest: GuestService,
  Site: SiteService,
  SiteType: SiteTypeService,
  Discount: DiscountService,
  Charge: ChargeService,
  Credit: CreditService,
  DateRange: DateRangeService,
  EmailTemplate: EmailTemplatesService,
  GlAccount: GlAccountService,
  Message: MessageService,
  EmailMessage: EmailMessageService,
  OrderItem: OrderItemService,
  Order: OrderService,
  PaymentGateway: PaymentGatewayService,
  PaymentMethod: PaymentMethodService,
  CardPaymentMethod: CardPaymentMethodService,
  Payment: PaymentService,
  Reservation: ReservationService,
  GroupHold: GroupHoldService,
  Product: ProductService,
  Rate: RateService,
  Refund: RefundService,
  Sundry: SundryService,
  TaxRate: TaxRateService,
  Transaction: TransactionService,
  UniversalType: UniversalTypesService,
  PaymentRule: PaymentRuleService,
  TaxRule: TaxRuleService,
  UtilityFee: UtilityFeeService,
  UtilityTax: UtilityTaxService,
  UtilityType: UtilityTypeService,
  UtilityMeter: UtilityMeterService,
  UtilityReading: UtilityReadingService,
  ActivityLog: ActivityLogService,
  Location: LocationService,
  LongTerm: LongTermRequestService,
  Lookup: LookupService,
  Maintenance: MaintenanceService,
  Photo: PhotoService,
  File: FileService,
  ProductCategory: ProductCategoryService,
  ReservationFilter: ReservationFiltersService,
  SiteHold: SiteHoldService,
  User: UserService,
  Vehicle: VehicleService,
  ProcessingFee: ProcessingFeeService,

}
